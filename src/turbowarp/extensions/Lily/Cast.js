// Name: Cast
// ID: lmsCast
// Description: Convert values between types.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// License: MIT AND LGPL-3.0

/* generated l10n code */Scratch.translate.setup({"it":{"_string":"stringa"},"ja":{"_string":"文字列"},"nl":{"_boolean":"booleaans","_cast [INPUT] to [TYPE]":"zet [INPUT] om naar [TYPE]","_default":"standaard","_number":"getal","_type of [INPUT]":"soort van [INPUT]"},"ru":{"_boolean":"логическое","_cast [INPUT] to [TYPE]":"вывести [INPUT] в [TYPE]","_default":"по умолчанию","_number":"цифра","_string":"строка","_type of [INPUT]":"тип переменной [INPUT]"},"zh-cn":{"_boolean":"布尔值","_cast [INPUT] to [TYPE]":"将[INPUT]转换为类型[TYPE]","_default":"默认类型","_number":"数字","_string":"字符串","_type of [INPUT]":"[INPUT]的类型"}});/* end generated l10n code */(function (Scratch) {
  "use strict";

  const Cast = Scratch.Cast;

  class CastUtil {
    getInfo() {
      return {
        id: "lmsCast",
        name: "Cast",
        blocks: [
          {
            opcode: "toType",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("cast [INPUT] to [TYPE]"),
            allowDropAnywhere: true,
            disableMonitor: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "type",
              },
            },
          },
          {
            opcode: "typeOf",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("type of [INPUT]"),
            disableMonitor: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
        ],
        menus: {
          type: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("number"),
                value: "number",
              },
              {
                text: Scratch.translate("string"),
                value: "string",
              },
              {
                text: Scratch.translate("boolean"),
                value: "boolean",
              },
              {
                text: Scratch.translate("default"),
                value: "default",
              },
            ],
          },
        },
      };
    }

    toType(args) {
      const input = args.INPUT;
      switch (args.TYPE) {
        case "number":
          return Cast.toNumber(input);
        case "string":
          return Cast.toString(input);
        case "boolean":
          return Cast.toBoolean(input);
        default:
          return input;
      }
    }

    typeOf(args) {
      const input = args.INPUT;
      switch (typeof input) {
        case "number":
          return "number";
        case "string":
          return "string";
        case "boolean":
          return "boolean";
        default:
          return "";
      }
    }
  }

  Scratch.extensions.register(new CastUtil());
})(Scratch);
