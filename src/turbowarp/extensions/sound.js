// Name: Sound
// ID: notSound
// Description: Play sounds from URLs.
// License: MIT AND MPL-2.0

/* generated l10n code */Scratch.translate.setup({"de":{"_Sound":"Klänge"},"fi":{"_Sound":"Ääni"},"it":{"_Sound":"Suoni","_play sound from url: [path] until done":"avvia riproduzione suono da url: [path] e attendi la fine","_start sound from url: [path]":"riproduci suono da url: [path]"},"ja":{"_Sound":"音声"},"nb":{"_Sound":"Lyd","_play sound from url: [path] until done":"spill lyd fra nettadresse: [path] til ferdig","_start sound from url: [path]":"start lyd fra url: [path]"},"nl":{"_Sound":"Geluid","_play sound from url: [path] until done":"start geluid van URL: [path] en wacht","_start sound from url: [path]":"start geluid van URL: [path]"},"ru":{"_Sound":"Звук","_play sound from url: [path] until done":"играть звук из url: [path] до конца","_start sound from url: [path]":"включить звук из url: [path]"},"uk":{"_Sound":"Звуки","_play sound from url: [path] until done":"відтворити звук з url; [path] до кінця","_start sound from url: [path]":"відтворити звук з url; [path]"},"zh-cn":{"_Sound":"声音","_play sound from url: [path] until done":"播放URL[path]的声音直到结束","_start sound from url: [path]":"播放URL[path]的声音"}});/* end generated l10n code */((Scratch) => {
  "use strict";

  const audioEngine = Scratch.vm.runtime.audioEngine;

  /**
   * This method assumes that the caller has already requested permission to fetch the URL.
   * @param {string} url
   * @returns {Promise<ArrayBuffer>}
   */
  const fetchAsArrayBufferWithTimeout = (url) =>
    new Promise((resolve, reject) => {
      // Permission is checked in playSound()
      // eslint-disable-next-line no-restricted-syntax
      const xhr = new XMLHttpRequest();
      let timeout = setTimeout(() => {
        xhr.abort();
        reject(new Error("Timed out"));
      }, 5000);
      xhr.onload = () => {
        clearTimeout(timeout);
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(new Error(`HTTP error ${xhr.status} while fetching ${url}`));
        }
      };
      xhr.onerror = () => {
        clearTimeout(timeout);
        reject(new Error(`Failed to request ${url}`));
      };
      xhr.responseType = "arraybuffer";
      xhr.open("GET", url);
      xhr.send();
    });

  /**
   * @type {Map<string, {sound: AudioEngine.SoundPlayer | null, error: unknown}>}
   */
  const soundPlayerCache = new Map();

  /**
   * @param {string} url
   * @returns {Promise<AudioEngine.SoundPlayer>}
   */
  const decodeSoundPlayer = async (url) => {
    const cached = soundPlayerCache.get(url);
    if (cached) {
      if (cached.sound) {
        return cached.sound;
      }
      throw cached.error;
    }

    try {
      const arrayBuffer = await fetchAsArrayBufferWithTimeout(url);
      const soundPlayer = await audioEngine.decodeSoundPlayer({
        data: {
          buffer: arrayBuffer,
        },
      });
      soundPlayerCache.set(url, {
        sound: soundPlayer,
        error: null,
      });
      return soundPlayer;
    } catch (e) {
      soundPlayerCache.set(url, {
        sound: null,
        error: e,
      });
      throw e;
    }
  };

  /**
   * @param {string} url
   * @param {VM.Target} target
   * @returns {Promise<boolean>} true if the sound could be played, false if the sound could not be decoded
   */
  const playWithAudioEngine = async (url, target) => {
    const soundBank = target.sprite.soundBank;

    /** @type {AudioEngine.SoundPlayer} */
    let soundPlayer;
    try {
      const originalSoundPlayer = await decodeSoundPlayer(url);
      soundPlayer = originalSoundPlayer.take();
    } catch (e) {
      console.warn(
        "Could not fetch audio; falling back to primitive approach",
        e
      );
      return false;
    }

    soundBank.addSoundPlayer(soundPlayer);
    await soundBank.playSound(target, soundPlayer.id);

    delete soundBank.soundPlayers[soundPlayer.id];
    soundBank.playerTargets.delete(soundPlayer.id);
    soundBank.soundEffects.delete(soundPlayer.id);

    return true;
  };

  /**
   * This method assumes that the caller has already requested permission to fetch the URL.
   * @param {string} url
   * @param {VM.Target} target
   * @returns {Promise<void>}
   */
  const playWithAudioElement = (url, target) =>
    new Promise((resolve, reject) => {
      // Unfortunately, we can't play all sounds with the audio engine.
      // For these sounds, fall back to a primitive <audio>-based solution that will work for all
      // sounds, even those without CORS.
      // Permission is checked in playSound()
      // eslint-disable-next-line no-restricted-syntax
      const mediaElement = new Audio(url);

      // Make a minimal effort to simulate Scratch's sound effects.
      // We can get pretty close for volumes <100%.
      // playbackRate does not have enough range for simulating pitch.
      // There is no way for us to pan left or right.
      mediaElement.volume = target.volume / 100;

      mediaElement.onended = () => {
        resolve();
      };
      mediaElement
        .play()
        .then(() => {
          // Wait for onended
        })
        .catch((err) => {
          reject(err);
        });
    });

  /**
   * @param {string} url
   * @param {VM.Target} target
   * @returns {Promise<void>}
   */
  const playSound = async (url, target) => {
    try {
      if (!(await Scratch.canFetch(url))) {
        throw new Error(`Permission to fetch ${url} denied`);
      }

      const success = await playWithAudioEngine(url, target);
      if (!success) {
        return await playWithAudioElement(url, target);
      }
    } catch (e) {
      console.warn(`All attempts to play ${url} failed`, e);
    }
  };

  class Sound {
    getInfo() {
      return {
        // 'sound' would conflict with normal Scratch
        id: "notSound",
        name: Scratch.translate("Sound"),
        blocks: [
          {
            opcode: "play",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("start sound from url: [path]"),
            arguments: {
              path: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/meow.mp3",
              },
            },
          },
          {
            opcode: "playUntilDone",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("play sound from url: [path] until done"),
            arguments: {
              path: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/meow.mp3",
              },
            },
          },
        ],
      };
    }

    play({ path }, util) {
      playSound(path, util.target);
    }

    playUntilDone({ path }, util) {
      return playSound(path, util.target);
    }
  }

  Scratch.extensions.register(new Sound());
})(Scratch);
