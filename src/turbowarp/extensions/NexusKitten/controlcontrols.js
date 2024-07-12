// Name: Control Controls
// ID: nkcontrols
// Description: Show and hide the project's controls.
// By: NamelessCat <https://scratch.mit.edu/users/NexusKitten/>
// License: MIT

/* generated l10n code */Scratch.translate.setup({"de":{"_Control Controls":"Kontrolle der Kontrollleiste"},"fi":{"_Control Controls":"Ohjainten säätö"},"it":{"_Control Controls":"Gestione Pulsanti di Controllo","_[OPTION] exists?":"[OPTION] esiste","_[OPTION] shown?":"[OPTION] visibile","_fullscreen":"schermo intero","_green flag":"bandiera verde","_hide [OPTION]":"nascondi [OPTION]","_pause":"pausa","_show [OPTION]":"mostra [OPTION]","_stop":"arresta"},"ja":{"_fullscreen":"フルスクリーン","_green flag":"緑の旗","_pause":"一時停止","_stop":"止める"},"nb":{"_Control Controls":"Kontroll Kontroller","_[OPTION] exists?":"[OPTION] finnes?","_[OPTION] shown?":"[OPTION] vist?","_fullscreen":"fullskjerm","_green flag":"grønt flagg","_hide [OPTION]":"skjul [OPTION]","_show [OPTION]":"vis [OPTION]","_stop":"stopp"},"nl":{"_Control Controls":"Projectbesturing-besturing","_[OPTION] exists?":"[OPTION] bestaat?","_[OPTION] shown?":"[OPTION] getoond?","_fullscreen":"volledig scherm","_green flag":"groene vlag","_hide [OPTION]":"verberg [OPTION]","_pause":"pauzeer","_show [OPTION]":"toon [OPTION]"},"ru":{"_Control Controls":"Настройки Управления","_[OPTION] exists?":"[OPTION] существует?","_[OPTION] shown?":"[OPTION] показан?","_fullscreen":"полноэкранный режим","_green flag":"зелёный флаг","_hide [OPTION]":"скрыть [OPTION]","_pause":"пауза","_show [OPTION]":"показать [OPTION]","_stop":"стоп"},"tr":{"_Control Controls":"Kontrol Kontrolleri"},"zh-cn":{"_Control Controls":"控件控制","_[OPTION] exists?":"存在[OPTION]？","_[OPTION] shown?":"显示[OPTION]了？","_fullscreen":"全屏","_green flag":"绿旗","_hide [OPTION]":"隐藏[OPTION]","_pause":"暂停","_show [OPTION]":"显示[OPTION]","_stop":"停止"}});/* end generated l10n code */(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Control Controls must run unsandboxed");
  }

  var fullScreen;
  var greenFlag;
  var pauseButton;
  var stopButton;

  const getButtons = () => {
    fullScreen = undefined;
    greenFlag = undefined;
    pauseButton = undefined;
    stopButton = undefined;

    const rightButtons = document.querySelectorAll(
      '[class*="stage-header_stage-button_"]'
    );
    fullScreen = rightButtons[rightButtons.length - 1];
    if (!fullScreen) {
      fullScreen =
        document.querySelector(".fullscreen-button") ||
        document.querySelector(".standalone-fullscreen-button");
    }

    greenFlag =
      document.querySelector('[class*="green-flag_green-flag_"]') ||
      document.querySelector(".green-flag-button");
    pauseButton =
      document.querySelector(".pause-btn") ||
      document.querySelector(".pause-button");
    stopButton =
      document.querySelector('[class*="stop-all_stop-all_"]') ||
      document.querySelector(".stop-all-button");
  };

  class controlcontrols {
    constructor() {
      Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
        getButtons();
        for (const button of [fullScreen, greenFlag, pauseButton, stopButton]) {
          if (button) {
            button.style.display = "block";
          }
        }
      });
    }
    getInfo() {
      return {
        id: "nkcontrols",
        name: Scratch.translate("Control Controls"),
        color1: "#ffab19",
        color2: "#ec9c13",
        color3: "#b87d17",
        blocks: [
          {
            opcode: "showOption",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show [OPTION]"),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "OPTION",
              },
            },
            extensions: ["colours_control"],
          },
          {
            opcode: "hideOption",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("hide [OPTION]"),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "OPTION",
              },
            },
            extensions: ["colours_control"],
          },
          "---",
          {
            opcode: "optionShown",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[OPTION] shown?"),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "OPTION",
              },
            },
            extensions: ["colours_control"],
          },
          "---",
          {
            opcode: "optionExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[OPTION] exists?"),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "OPTION",
              },
            },
            extensions: ["colours_control"],
          },
        ],
        menus: {
          OPTION: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("green flag"),
                value: "green flag",
              },
              {
                text: Scratch.translate("pause"),
                value: "pause",
              },
              {
                text: Scratch.translate("stop"),
                value: "stop",
              },
              {
                text: Scratch.translate("fullscreen"),
                value: "fullscreen",
              },
            ],
          },
        },
      };
    }

    showOption(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        greenFlag.style.display = "block";
      } else if (args.OPTION === "pause" && pauseButton) {
        pauseButton.style.display = "block";
      } else if (args.OPTION === "stop" && stopButton) {
        stopButton.style.display = "block";
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        fullScreen.style.display = "block";
      }
    }

    hideOption(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        greenFlag.style.display = "none";
      } else if (args.OPTION === "pause" && pauseButton) {
        pauseButton.style.display = "none";
      } else if (args.OPTION === "stop" && stopButton) {
        stopButton.style.display = "none";
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        fullScreen.style.display = "none";
      }
    }

    optionShown(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        return greenFlag.style.display !== "none";
      } else if (args.OPTION === "pause" && pauseButton) {
        return pauseButton.style.display !== "none";
      } else if (args.OPTION === "stop" && stopButton) {
        return stopButton.style.display !== "none";
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        return fullScreen.style.display !== "none";
      }
      return false;
    }

    optionExists(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        return true;
      } else if (args.OPTION === "pause" && pauseButton) {
        return true;
      } else if (args.OPTION === "stop" && stopButton) {
        return true;
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        return true;
      }
      return false;
    }
  }
  Scratch.extensions.register(new controlcontrols());
})(Scratch);
