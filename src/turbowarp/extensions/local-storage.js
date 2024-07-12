// Name: Local Storage
// ID: localstorage
// Description: Store data persistently. Like cookies, but better.
// License: MIT AND MPL-2.0

/* generated l10n code */Scratch.translate.setup({"de":{"_Local Storage":"Speicherplatz"},"fi":{"_Local Storage":"Paikallinen muisti"},"it":{"_Local Storage":"Memoria Locale","_Local Storage extension: project must run the \"set storage namespace ID\" block before it can use other blocks":"Estensione Archiviazone Locale: il progetto deve eseguire il blocco \"imposta ID spazio di archiviazione\" prima di usare gli altri blocchi","_delete all keys":"cancella tutte le chiavi","_delete key [KEY]":"cancella chiave [KEY]","_get key [KEY]":"valore della chiave [KEY]","_project title":"titolo progetto","_score":"punteggio","_set key [KEY] to [VALUE]":"imposta valore chiave [KEY] a [VALUE]","_set storage namespace ID to [ID]":"imposta ID spazio archiviazione a [ID]","_when another window changes storage":"quando altra finestra cambia spazio di archiviazione"},"ja":{"_Local Storage":"ローカルストレージ","_Local Storage extension: project must run the \"set storage namespace ID\" block before it can use other blocks":"ローカルストレージ拡張機能：他のブロックを実行する前に、「ストレージの名前を()にする」ブロックを実行する必要があります。","_get key [KEY]":"キーを取得[KEY]","_set storage namespace ID to [ID]":"ストレージの名前空間IDを[ID]にする"},"nb":{"_Local Storage":"Lokal lagring","_Local Storage extension: project must run the \"set storage namespace ID\" block before it can use other blocks":"Lokal lagring utvidelse: prosjektet må kjøre blokken \"sett lagringsnavnerom-ID\" før det kan bruke andre blokker","_delete all keys":"slett alle nøkler","_delete key [KEY]":"slett nøkkel [KEY]","_get key [KEY]":"få nøkkel [KEY]","_project title":"prosjekttittel","_score":"poengsum","_set key [KEY] to [VALUE]":"sett nøkkel [KEY] til [VALUE]","_set storage namespace ID to [ID]":"sett lagringsnavnerom-ID til [ID]","_when another window changes storage":"når et annet vindu endrer lagring"},"nl":{"_Local Storage":"Lokale opslag","_Local Storage extension: project must run the \"set storage namespace ID\" block before it can use other blocks":"Lokale opslag-extensie: het project moet eerst een opslagnaamruimte-ID toegewezen krijgen voordat de andere blokken kunnen werken.","_delete all keys":"verwijder alle sleutels","_delete key [KEY]":"verwijder sleutel [KEY]","_get key [KEY]":"sleutel [KEY]","_project title":"projecttitel","_set key [KEY] to [VALUE]":"maak sleutel [KEY] [VALUE]","_set storage namespace ID to [ID]":"maak opslagnaamruimte-ID [ID]","_when another window changes storage":"wanneer een ander venster de opslag aanpast"},"ru":{"_Local Storage":"Локальное Хранилище","_Local Storage extension: project must run the \"set storage namespace ID\" block before it can use other blocks":"Расширение Локальное Хранилище: проект должен запустить блок \"установить ID пространства имен хранилища\", прежде чем он сможет использовать другие блоки","_delete all keys":"удалить все значения","_delete key [KEY]":"удалить значение [KEY]","_get key [KEY]":"получить значение [KEY]","_project title":"название проекта","_score":"очки","_set key [KEY] to [VALUE]":"установить значение [KEY] на [VALUE]","_set storage namespace ID to [ID]":"установить ID хранилища на [ID]","_when another window changes storage":"когда другое окно изменяет хранилище"},"zh-cn":{"_Local Storage":"本地存储","_Local Storage extension: project must run the \"set storage namespace ID\" block before it can use other blocks":"本地存储拓展：请先运行“设置存储命名空间ID”积木才能使用下面的积木","_delete all keys":"删除所有本地存储变量","_delete key [KEY]":"删除本地存储变量[KEY]","_get key [KEY]":"本地存储变量[KEY]的值","_project title":"作品标题","_score":"分数","_set key [KEY] to [VALUE]":"设置本地存储变量[KEY]的值为[VALUE]","_set storage namespace ID to [ID]":"设置存储命名空间ID为[ID]","_when another window changes storage":"当其他页面修改本地存储数据"}});/* end generated l10n code */(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Local Storage must be run unsandboxed");
  }

  const PREFIX = "extensions.turbowarp.org/local-storage:";
  let namespace = "";
  const getFullStorageKey = () => `${PREFIX}${namespace}`;

  let lastNamespaceWarning = 0;

  const validNamespace = () => {
    const valid = !!namespace;
    if (!valid && Date.now() - lastNamespaceWarning > 3000) {
      alert(
        Scratch.translate(
          'Local Storage extension: project must run the "set storage namespace ID" block before it can use other blocks'
        )
      );
      lastNamespaceWarning = Date.now();
    }
    return valid;
  };

  const readFromStorage = () => {
    try {
      // localStorage could throw if unsupported
      const data = localStorage.getItem(getFullStorageKey());
      if (data) {
        // JSON.parse could throw if data is invalid
        const parsed = JSON.parse(data);
        if (parsed && parsed.data) {
          // Remove invalid values from the JSON
          const processed = {};
          for (const [key, value] of Object.entries(parsed.data)) {
            if (
              typeof value === "number" ||
              typeof value === "string" ||
              typeof value === "boolean"
            ) {
              processed[key] = value;
            }
          }
          return processed;
        }
      }
    } catch (error) {
      console.error("error reading from local storage", error);
    }
    return {};
  };

  const saveToLocalStorage = (data) => {
    try {
      if (Object.keys(data).length > 0) {
        localStorage.setItem(
          getFullStorageKey(),
          JSON.stringify({
            time: Math.round(Date.now() / 1000),
            data,
          })
        );
      } else {
        localStorage.removeItem(getFullStorageKey());
      }
    } catch (error) {
      console.error("error saving to locacl storage", error);
    }
  };

  window.addEventListener("storage", (event) => {
    if (
      namespace &&
      event.key === getFullStorageKey() &&
      event.storageArea === localStorage
    ) {
      Scratch.vm.runtime.startHats("localstorage_whenChanged");
    }
  });

  Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
    namespace = "";
  });

  class LocalStorage {
    getInfo() {
      return {
        id: "localstorage",
        name: Scratch.translate("Local Storage"),
        docsURI: "https://extensions.turbowarp.org/local-storage",
        blocks: [
          {
            opcode: "setProjectId",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set storage namespace ID to [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("project title"),
              },
            },
          },
          {
            opcode: "get",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get key [KEY]"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("score"),
              },
            },
          },
          {
            opcode: "set",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set key [KEY] to [VALUE]"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("score"),
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1000",
              },
            },
          },
          {
            opcode: "remove",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete key [KEY]"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("score"),
              },
            },
          },
          {
            opcode: "removeAll",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete all keys"),
          },
          {
            opcode: "whenChanged",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when another window changes storage"),
            isEdgeActivated: false,
          },
        ],
      };
    }
    setProjectId({ ID }) {
      namespace = Scratch.Cast.toString(ID);
    }
    get({ KEY }) {
      if (!validNamespace()) {
        return "";
      }
      const storage = readFromStorage();
      KEY = Scratch.Cast.toString(KEY);
      if (!Object.prototype.hasOwnProperty.call(storage, KEY)) {
        return "";
      }
      return storage[KEY];
    }
    set({ KEY, VALUE }) {
      if (!validNamespace()) {
        return "";
      }
      const storage = readFromStorage();
      storage[Scratch.Cast.toString(KEY)] = VALUE;
      saveToLocalStorage(storage);
    }
    remove({ KEY }) {
      if (!validNamespace()) {
        return "";
      }
      const storage = readFromStorage();
      delete storage[Scratch.Cast.toString(KEY)];
      saveToLocalStorage(storage);
    }
    removeAll() {
      if (!validNamespace()) {
        return "";
      }
      saveToLocalStorage({});
    }
  }
  Scratch.extensions.register(new LocalStorage());
})(Scratch);
