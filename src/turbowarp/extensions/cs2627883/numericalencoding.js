// Name: Numerical Encoding V1
// ID: cs2627883NumericalEncoding
// Description: Use V2 instead as it is more efficient. V1 only exists for compatibility reasons.
// By: cs2627883 <https://scratch.mit.edu/users/cs2627883/>
// License: MIT

// https://github.com/CS2627883/Turbowarp-Encoding-Extension/blob/main/Encoding.js

/* generated l10n code */Scratch.translate.setup({"fi":{"_Numerical Encoding V1":"Numerosalaus V1"},"it":{"_Decode [ENCODED] back to text":"decodifica [ENCODED] in testo","_Encode [DATA] to numbers":"codifica [DATA] in numeri","_Hello!":"Ciao!","_Numerical Encoding V1":"Codifica Numerica V1","_decoded":"decodificato","_encoded":"codificato"},"ja":{"_Hello!":"こんにちは!"},"nb":{"_Decode [ENCODED] back to text":"Dekode [ENCODED] tilbake til tekst","_Encode [DATA] to numbers":"Kode [DATA] til tall","_Hello!":"Hei!","_Numerical Encoding V1":"Numerisk Koding V1","_decoded":"dekodet","_encoded":"kodet"},"nl":{"_Decode [ENCODED] back to text":"decodeer [ENCODED] terug naar tekst","_Encode [DATA] to numbers":"codeer [DATA] naar getallen","_Hello!":"Hallo!","_Numerical Encoding V1":"Numerieke codering V1","_decoded":"gedecodeerd","_encoded":"gecodeerd"},"ru":{"_Decode [ENCODED] back to text":"Декодировать [ENCODED] обратно в текст","_Encode [DATA] to numbers":"Закодировать [DATA] в цифры","_Hello!":"Привет!","_Numerical Encoding V1":"Численная Кодировка V1","_decoded":"декодированное","_encoded":"закодированное"},"zh-cn":{"_Decode [ENCODED] back to text":"解码数字[ENCODED]为文本","_Encode [DATA] to numbers":"编码文本[DATA]为数字","_Hello!":"你好！","_Numerical Encoding V1":"数字编码 V1","_decoded":"解码数据","_encoded":"编码数据"}});/* end generated l10n code */(function (Scratch) {
  "use strict";

  // There are 149,186 unicode characters, so the maximum character code length is 6
  const MAX_CHAR_LEN = 6;

  /**
   * @param {string} str
   * @returns {string}
   */
  const encode = (str) => {
    let encoded = "";
    for (let i = 0; i < str.length; ++i) {
      // Get character
      const char = String(str.charCodeAt(i));
      // Pad encodedChar with 0s to ensure all encodedchars are the same length
      const encodedChar = "0".repeat(MAX_CHAR_LEN - char.length) + char;
      encoded += encodedChar;
    }
    return encoded;
  };

  /**
   * @param {string} str
   * @returns {string}
   */
  const decode = (str) => {
    if (str === "") {
      return "";
    }
    let decoded = "";
    // Create regex to split by char length
    const regex = new RegExp(".{1," + MAX_CHAR_LEN + "}", "g");
    // Split into array of characters
    const split = str.match(regex);
    for (let i = 0; i < split.length; i++) {
      // Get character from char code
      const decodedChar = String.fromCharCode(+split[i]);
      decoded += decodedChar;
    }
    return decoded;
  };

  class NumericalEncodingExtension {
    /** @type {string|number} */
    encoded = 0;

    /** @type {string|number} */
    decoded = 0;

    getInfo() {
      return {
        id: "cs2627883NumericalEncoding",
        name: Scratch.translate("Numerical Encoding V1"),
        blocks: [
          {
            opcode: "NumericalEncode",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("Encode [DATA] to numbers"),
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello!"),
              },
            },
          },
          {
            opcode: "NumericalDecode",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("Decode [ENCODED] back to text"),
            arguments: {
              ENCODED: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: encode(Scratch.translate("Hello!")),
              },
            },
          },
          {
            opcode: "GetNumericalEncoded",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("encoded"),
          },
          {
            opcode: "GetNumericalDecoded",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("decoded"),
          },
        ],
      };
    }
    NumericalEncode(args) {
      this.encoded = encode(Scratch.Cast.toString(args.DATA));
    }
    NumericalDecode(args) {
      this.decoded = decode(Scratch.Cast.toString(args.ENCODED));
    }
    GetNumericalEncoded(args) {
      return this.encoded;
    }
    GetNumericalDecoded(args) {
      return this.decoded;
    }
  }

  Scratch.extensions.register(new NumericalEncodingExtension());
})(Scratch);
