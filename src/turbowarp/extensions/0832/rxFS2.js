// Name: rxFS
// ID: 0832rxfs2
// Description: Blocks for interacting with a virtual in-memory filesystem.
// By: 0832
// License: MIT

/*!
 * Made by 0832
 * This file was originally under the rxLI Version 2.1 license:
 * https://0832k12.github.io/rxLi/2.1/
 *
 * However they have since claimed it to be "directly compatible with MIT license",
 * which is the license we use this file under.
 */

/* generated l10n code */Scratch.translate.setup({"es":{"del":"Eliminar [STR]","folder":"Fijar [STR] a [STR2]","folder_default":"¡rxFS es bueno!","open":"Abrir [STR]","start":"Crear [STR]","sync":"Cambiar la ubicación de [STR] a [STR2]","webin":"Cargar [STR] de la web"},"fi":{"clean":"tyhjennä tiedostojärjestelmä","del":"poista [STR]","folder":"aseta [STR] arvoon [STR2]","folder_default":"rxFS on hieno!","in":"tuo tiedostojärjestelmä kohteesta [STR]","list":"luettelo kaikista kohteessa [STR] sijaitsevista tiedostoista","open":"avaa [STR]","out":"vie tiedostojärjestelmä","search":"etsi [STR]","start":"luo [STR]","sync":"muuta kohteen [STR] sijainniksi [STR2]","webin":"lataa [STR] verkosta"},"it":{"clean":"Svuota il file system","del":"Rimuovi [STR]","folder":"Imposta [STR] a [STR2]","folder_default":"rxFS funziona!","in":"Importa il file system da [STR]","list":"Elenco dei file in [STR]","open":"Apri [STR]","out":"Esporta il file system","search":"Cerca [STR]","start":"Crea [STR]","sync":"Cambia la posizione di [STR] in [STR2]","webin":"Leggi [STR] dal web"},"ja":{"clean":"ファイルシステムを削除する","del":"[STR]を削除","folder":"[STR]を[STR2]にセットする","folder_default":"rxFSは良い!","in":"[STR]からファイルシステムをインポートする","list":"[STR]直下のファイルをリスト化する","open":"[STR]を開く","out":"ファイルシステムをエクスポートする","search":"[STR]を検索","start":"[STR]を作成","sync":"[STR]のロケーションを[STR2]に変更する","webin":"[STR]をウェブから読み込む"},"nb":{"clean":"Tøm filsystemet","del":"Slett [STR]","folder":"Sett [STR] til [STR2]","folder_default":"rxFS er bra!","in":"Import filsystem fra [STR]","list":"List alle filer under [STR]","open":"Åpne [STR]","out":"Eksporter filsystemet","search":"Søk [STR]","start":"Opprett [STR]","sync":"Endre plasseringen av [STR] til [STR2]","webin":"Last [STR] fra nettet"},"nl":{"clean":"wis het bestandssysteem","del":"verwijder [STR]","folder":"maak [STR] [STR2]","folder_default":"rxFS is geweldig!","in":"importeer bestandssysteem van [STR]","list":"alle bestanden onder [STR]","open":"open [STR]","out":"exporteer bestandssysteem","search":"zoek [STR]","start":"creëer [STR]","sync":"verander locatie van [STR] naar [STR2]","webin":"laad [STR] van het web"},"ru":{"clean":"Очистить файловую систему","del":"Удалить [STR]","folder":"Задать [STR] значение [STR2]","folder_default":"rxFS это хорошо!","in":"Импортировать файловую систему из [STR]","list":"Список всех файлов из [STR]","open":"Открыть [STR]","out":"Экспорт файловой системы","search":"Найти [STR]","start":"Создать [STR]","sync":"Изменить расположение [STR] на [STR2]","webin":"Загрузить [STR] из сети"},"zh-cn":{"clean":"清空文件系统","del":"删除 [STR]","folder":"设置 [STR] 为 [STR2]","folder_default":"rxFS 好用！","in":"从 [STR] 导入文件系统","list":"列出 [STR] 下的所有文件","open":"打开 [STR]","out":"导出文件系统","search":"搜索 [STR]","start":"新建 [STR]","sync":"将 [STR] 的位置改为 [STR2]","webin":"从网络加载 [STR]"}});/* end generated l10n code */(function (Scratch) {
  "use strict";

  var rxFSfi = new Array();
  var rxFSsy = new Array();
  var Search, str, str2;

  const folder =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyOC40NjI1IiBoZWlnaHQ9IjI3LjciIHZpZXdCb3g9IjAsMCwyOC40NjI1LDI3LjciPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjYuMDE5NTMsLTE2NC4xMTg3NSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0iIzk5NjZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9IlNhbnMgU2VyaWYiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIGZvbnQtc2l6ZT0iNDAiIHRleHQtYW5jaG9yPSJzdGFydCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjx0ZXh0IHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyNi4yNjk1MywxODUuNzY4NzUpIHNjYWxlKDAuNSwwLjUpIiBmb250LXNpemU9IjQwIiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSIjOTk2NmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0iU2FucyBTZXJpZiIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHRzcGFuIHg9IjAiIGR5PSIwIj7wn5OBPC90c3Bhbj48L3RleHQ+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTMuOTgwNDY4NzU6MTUuODgxMjQ5MjM3MDYwNTMtLT4=";
  const file =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyOC40NjI1IiBoZWlnaHQ9IjI3LjciIHZpZXdCb3g9IjAsMCwyOC40NjI1LDI3LjciPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjYuMDE5NTMsLTE2NC4xMTg3NSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0iIzk5NjZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9IlNhbnMgU2VyaWYiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIGZvbnQtc2l6ZT0iNDAiIHRleHQtYW5jaG9yPSJzdGFydCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjx0ZXh0IHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyNi4yNjk1MywxODUuNzY4NzUpIHNjYWxlKDAuNSwwLjUpIiBmb250LXNpemU9IjQwIiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSIjOTk2NmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0iU2FucyBTZXJpZiIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHRzcGFuIHg9IjAiIGR5PSIwIj7wn5ODPC90c3Bhbj48L3RleHQ+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTMuOTgwNDY4NzU6MTUuODgxMjQ5NjE4NTMwMjYyLS0+";

  class rxFS {
    getInfo() {
      return {
        id: "0832rxfs2",
        name: "rxFS",
        color1: "#192d50",
        color2: "#192d50",
        color3: "#192d50",
        blocks: [
          {
            blockIconURI: file,
            opcode: "start",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({ id: "start", default: "Create [STR]" }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/rxFS/example",
              },
            },
          },
          {
            blockIconURI: file,
            opcode: "folder",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "folder",
              default: "Set [STR] to [STR2]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/rxFS/example",
              },
              STR2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  id: "folder_default",
                  default: "rxFS is good!",
                }),
              },
            },
          },
          {
            blockIconURI: file,
            opcode: "sync",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "sync",
              default: "Change the location of [STR] to [STR2]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/rxFS/example",
              },
              STR2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/rxFS/example",
              },
            },
          },
          {
            blockIconURI: file,
            opcode: "del",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({ id: "del", default: "Delete [STR]" }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/rxFS/example",
              },
            },
          },
          {
            blockIconURI: file,
            opcode: "webin",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "webin",
              default: "Load [STR] from the web",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://0832k12.github.io/rxFS/hello.txt",
              },
            },
          },
          {
            blockIconURI: file,
            opcode: "open",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({ id: "open", default: "Open [STR]" }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/rxFS/example",
              },
            },
          },
          "---",
          {
            blockIconURI: folder,
            opcode: "clean",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "clean",
              default: "Clear the file system",
            }),
            arguments: {},
          },
          {
            blockIconURI: folder,
            opcode: "in",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "in",
              default: "Import file system from [STR]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/rxFS/",
              },
            },
          },
          {
            blockIconURI: folder,
            opcode: "out",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "out",
              default: "Export file system",
            }),
            arguments: {},
          },
          {
            blockIconURI: folder,
            opcode: "list",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "list",
              default: "List all files under [STR]",
            }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/rxFS/",
              },
            },
          },
          {
            blockIconURI: folder,
            opcode: "search",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({ id: "search", default: "Search [STR]" }),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/rxFS/example",
              },
            },
          },
        ],
      };
    }

    clean() {
      rxFSfi = [];
      rxFSsy = [];
    }

    sync({ STR, STR2 }) {
      str = encodeURIComponent(STR);
      str2 = encodeURIComponent(STR2);
      if (rxFSsy.indexOf(str) + 1 == 0) {
        rxFSsy[rxFSsy.indexOf(str) + 1 - 1] = str2;
      }
    }

    start({ STR }) {
      str = encodeURIComponent(STR);
      if (
        !(str.charAt(str.length - 1) == "/") &&
        rxFSsy.indexOf(str) + 1 == 0
      ) {
        rxFSfi.splice(rxFSfi.length + 1 - 1, 0, null);
        rxFSsy.splice(rxFSsy.length + 1 - 1, 0, str);
      }
    }

    open({ STR }) {
      return decodeURIComponent(
        rxFSfi[rxFSsy.indexOf(encodeURIComponent(STR)) + 1 - 1]
      );
    }

    del({ STR }) {
      str = encodeURIComponent(STR);
      rxFSfi[rxFSsy.indexOf(str) + 1 - 1] = undefined;
      rxFSsy[rxFSsy.indexOf(str) + 1 - 1] = undefined;
    }

    folder({ STR, STR2 }) {
      rxFSfi[rxFSsy.indexOf(encodeURIComponent(STR)) + 1 - 1] =
        encodeURIComponent(STR2);
    }

    search({ STR }) {
      Search = "";
      i = 0;
      str = encodeURIComponent(STR);
      for (var i in rxFSsy) {
        if (!(rxFSsy[i].indexOf(str) == undefined)) {
          Search = [Search, ',"', rxFSsy[i], '"'].join("");
        }
      }
      return decodeURIComponent(Search);
    }

    list({ STR }) {
      Search = "";
      i = 0;
      str = encodeURIComponent(STR);
      for (var i in rxFSsy) {
        if (rxFSsy[i].slice(0, str.length) == str) {
          Search = [Search, ',"', rxFSsy[i], '"'].join("");
        }
      }
      return decodeURIComponent(Search);
    }

    webin({ STR }) {
      return Scratch.fetch(STR)
        .then((response) => {
          return response.text();
        })
        .catch((error) => {
          console.error(error);
          return "undefined";
        });
    }

    in({ STR }) {
      rxFSfi = STR.slice(0, STR.indexOf("|")).split(",");
      rxFSsy = STR.slice(STR.indexOf("|") + 1, STR.length).split(",");
    }

    out() {
      return [rxFSfi.join(","), "|", rxFSsy.join(",")].join("");
    }
  }

  Scratch.extensions.register(new rxFS());
})(Scratch);
