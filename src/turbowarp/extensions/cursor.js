// Name: Mouse Cursor
// ID: MouseCursor
// Description: Use custom cursors or hide the cursor. Also allows replacing the cursor with any costume image.
// License: MIT AND MPL-2.0

/* generated l10n code */Scratch.translate.setup({"de":{"_Mouse Cursor":"Mauszeiger"},"fi":{"_Mouse Cursor":"Hiiren osoitin"},"it":{"_Mouse Cursor":"Puntatore Mouse","_bottom left":"angolo sinistra in basso","_bottom right":"angolo destra in basso","_center":"centro","_cursor":"puntatore","_hide cursor":"nascondi puntatore","_set cursor to [cur]":"usa [cur] come puntatore","_set cursor to current costume center: [position] max size: [size]":"usa il costume attuale con centro: [position] dimensione massima: [size] come puntatore","_top left":"angolo sinistra in alto","_top right":"angolo destra in alto","_{size} (unreliable)":"{size} (inaffidabile)"},"ja":{"_Mouse Cursor":"マウスカーソル","_bottom left":"左下","_bottom right":"右下","_center":"中央","_top left":"左上","_top right":"右上"},"nb":{"_Mouse Cursor":"Mus Pekkeren","_bottom left":"nederst til venstre","_bottom right":"nederst til høyre","_center":"senter","_cursor":"pekeren","_hide cursor":"skjul pekeren","_set cursor to [cur]":"sett markøren til [cur]","_set cursor to current costume center: [position] max size: [size]":"sett markøren til midten av gjeldende drakt: [position] maks størrelse: [size]","_top left":"øverst til venstre","_top right":"øverst til høyre","_{size} (unreliable)":"{size} (upålitelig)"},"nl":{"_Mouse Cursor":"Muisaanwijzer","_bottom left":"linksonder","_bottom right":"rechtsonder","_center":"midden","_hide cursor":"verberg cursor","_set cursor to [cur]":"maak cursor [cur]","_set cursor to current costume center: [position] max size: [size]":"maak cursor huidig uiterlijk met middelpunt: [position] en max. grootte: [size]","_top left":"linksboven","_top right":"rechtsboven","_{size} (unreliable)":"{size} (onbetrouwbaar)"},"ru":{"_Mouse Cursor":"Курсор Мыши","_bottom left":"нижнем левом углу","_bottom right":"нижнем правом углу","_center":"центре","_cursor":"курсор","_hide cursor":"спрятать курсор","_set cursor to [cur]":"изменить курсор на [cur]","_set cursor to current costume center: [position] max size: [size]":"изменить курсор на текущий костюм с центром в: [position] максимальным размером: [size]","_top left":"верхнем левом углу","_top right":"верхнем правом углу","_{size} (unreliable)":"{size} (ненадежно)"},"uk":{"_Mouse Cursor":"Вказівник Миші"},"zh-cn":{"_Mouse Cursor":"鼠标图标","_bottom left":"底部左侧","_bottom right":"底部右侧","_center":"居中","_cursor":"鼠标样式","_hide cursor":"隐藏鼠标","_set cursor to [cur]":"设置鼠标样式为[cur]","_set cursor to current costume center: [position] max size: [size]":"设置鼠标中心为[position]，最大尺寸为[size]","_top left":"顶部左侧","_top right":"顶部右侧","_{size} (unreliable)":"{size}（实验性）"}});/* end generated l10n code */(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("MouseCursor extension must be run unsandboxed");
  }

  const lazilyCreatedCanvas = () => {
    /** @type {HTMLCanvasElement} */
    let canvas = null;
    /** @type {CanvasRenderingContext2D} */
    let ctx = null;
    /**
     * @param {number} width
     * @param {number} height
     * @returns {[HTMLCanvasElement, CanvasRenderingContext2D]}
     */
    return (width, height) => {
      if (!canvas) {
        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("Could not get 2d rendering context");
        }
      }
      // Setting canvas size also clears it
      canvas.width = width;
      canvas.height = height;
      return [canvas, ctx];
    };
  };
  const getRawSkinCanvas = lazilyCreatedCanvas();

  /**
   * @param {RenderWebGL.Skin} skin
   * @returns {string} A data: URI for the skin.
   */
  const encodeSkinToURL = (skin) => {
    const svgSkin = /** @type {RenderWebGL.SVGSkin} */ (skin);
    if (svgSkin._svgImage) {
      // This is an SVG skin
      return svgSkin._svgImage.src;
    }

    // It's probably a bitmap skin.
    // The most reliable way to get the bitmap in every runtime is through the silhouette.
    // This is very slow and could involve reading the texture from the GPU.
    const silhouette = skin._silhouette;
    // unlazy() only exists in TW
    if (silhouette.unlazy) {
      silhouette.unlazy();
    }
    const colorData = silhouette._colorData;
    const width = silhouette._width;
    const height = silhouette._height;
    const imageData = new ImageData(
      colorData,
      silhouette._width,
      silhouette._height
    );
    const [canvas, ctx] = getRawSkinCanvas(width, height);
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  };

  /**
   * @param {VM.Costume} costume
   * @param {number} maxWidth
   * @param {number} maxHeight
   * @returns {{uri: string, width: number, height: number}}
   */
  const costumeToCursor = (costume, maxWidth, maxHeight) => {
    const skin = Scratch.vm.renderer._allSkins[costume.skinId];
    const imageURI = encodeSkinToURL(skin);

    let width = skin.size[0];
    let height = skin.size[1];
    if (width > maxWidth) {
      height = height * (maxWidth / width);
      width = maxWidth;
    }
    if (height > maxHeight) {
      width = width * (maxHeight / height);
      height = maxHeight;
    }
    width = Math.round(width);
    height = Math.round(height);

    // We wrap the encoded image in an <svg>. This lets us do some clever things:
    //  - We can resize the image without a canvas.
    //  - We can give the browser an image with more raw pixels than its DPI independent size.
    // The latter is important so that cursors won't look horrible on high DPI displays. For
    // example, if the cursor will display at 32x32 in DPI independent units on a 2x high DPI
    // display, we actually need to send a 64x64 image for it to look good. This lets us do
    // that automatically.
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;
    svg += `<image href="${imageURI}" width="${width}" height="${height}" />`;
    svg += "</svg>";
    // URI encoding usually results in smaller string than base 64 for the types of data we get here.
    const svgURI = `data:image/svg+xml;,${encodeURIComponent(svg)}`;

    return {
      uri: svgURI,
      width,
      height,
    };
  };

  /** @type {string} */
  let nativeCursor = "default";
  /** @type {null|string} */
  let customCursorImageName = null;

  const canvas = Scratch.renderer.canvas;
  /** @type {string} */
  let currentCanvasCursor = nativeCursor;
  const updateCanvasCursor = () => {
    if (canvas.style.cursor !== currentCanvasCursor) {
      canvas.style.cursor = currentCanvasCursor;
    }
  };

  // scratch-gui will sometimes reset the cursor when resizing the window or going in/out of fullscreen
  new MutationObserver(updateCanvasCursor).observe(canvas, {
    attributeFilter: ["style"],
    attributes: true,
  });

  /**
   * Parse strings like "60x12" or "77,1"
   * @param {string} string
   * @returns {[number, number]}
   */
  const parseTuple = (string) => {
    const [a, b] = ("" + string).split(/[ ,x]/);
    return [+a || 0, +b || 0];
  };

  /**
   * @param {string} size eg. "48x84"
   * @returns {string}
   */
  const formatUnreliableSize = (size) =>
    Scratch.translate(
      {
        default: "{size} (unreliable)",
        description: "[size] is replaced with a size in pixels such as '48x48'",
      },
      { size }
    );

  const cursors = [
    "default",
    "pointer",
    "move",
    "grab",
    "grabbing",
    "text",
    "vertical-text",
    "wait",
    "progress",
    "help",
    "context-menu",
    "zoom-in",
    "zoom-out",
    "crosshair",
    "cell",
    "not-allowed",
    "copy",
    "alias",
    "no-drop",
    "all-scroll",
    "col-resize",
    "row-resize",
    "n-resize",
    "e-resize",
    "s-resize",
    "w-resize",
    "ne-resize",
    "nw-resize",
    "se-resize",
    "sw-resize",
    "ew-resize",
    "ns-resize",
    "nesw-resize",
    "nwse-resize",
  ];

  class MouseCursor {
    constructor() {
      Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
        this.setCur({
          cur: "default",
        });
      });
    }
    getInfo() {
      return {
        id: "MouseCursor",
        name: Scratch.translate("Mouse Cursor"),
        blocks: [
          {
            opcode: "setCur",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set cursor to [cur]"),
            arguments: {
              cur: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "pointer",
                menu: "cursors",
              },
            },
          },
          {
            opcode: "setCursorImage",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set cursor to current costume center: [position] max size: [size]"
            ),
            arguments: {
              position: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0,0",
                menu: "imagePositions",
              },
              size: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "32x32",
                menu: "imageSizes",
              },
            },
          },
          {
            opcode: "hideCur",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("hide cursor"),
          },
          {
            opcode: "getCur",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("cursor"),
          },
        ],
        menus: {
          cursors: {
            acceptReporters: true,
            items: cursors,
          },
          imagePositions: {
            acceptReporters: true,
            items: [
              // [x, y] where x is [0=left, 100=right] and y is [0=top, 100=bottom]
              { text: Scratch.translate("top left"), value: "0,0" },
              { text: Scratch.translate("top right"), value: "100,0" },
              { text: Scratch.translate("bottom left"), value: "0,100" },
              { text: Scratch.translate("bottom right"), value: "100,100" },
              { text: Scratch.translate("center"), value: "50,50" },
            ],
          },
          imageSizes: {
            acceptReporters: true,
            items: [
              // Some important numbers to keep in mind:
              // Browsers ignore cursor images >128 in any dimension (https://searchfox.org/mozilla-central/rev/43ee5e789b079e94837a21336e9ce2420658fd19/widget/gtk/nsWindow.cpp#3393-3402)
              // Browsers may refuse to display a cursor near window borders for images >32 in any dimension
              { text: "4x4", value: "4x4" },
              { text: "8x8", value: "8x4" },
              { text: "12x12", value: "12x12" },
              { text: "16x16", value: "16x16" },
              { text: "32x32", value: "32x32" },
              { text: formatUnreliableSize("48x48"), value: "48x48" },
              { text: formatUnreliableSize("64x64"), value: "64x64" },
              { text: formatUnreliableSize("128x128"), value: "128x128" },
            ],
          },
        },
      };
    }

    setCur(args) {
      const newCursor = Scratch.Cast.toString(args.cur);
      // Prevent setting cursor to "url(...), default" from causing fetch.
      if (cursors.includes(newCursor) || newCursor === "none") {
        nativeCursor = newCursor;
        customCursorImageName = null;
        currentCanvasCursor = newCursor;
        updateCanvasCursor();
      }
    }

    setCursorImage(args, util) {
      const [maxWidth, maxHeight] = parseTuple(args.size).map((i) =>
        Math.max(0, i)
      );

      const currentCostume =
        util.target.getCostumes()[util.target.currentCostume];
      const costumeName = currentCostume.name;

      let encodedCostume;
      try {
        encodedCostume = costumeToCursor(currentCostume, maxWidth, maxHeight);
      } catch (e) {
        // This could happen for a variety of reasons.
        console.error(e);
      }

      if (encodedCostume) {
        const [percentX, percentY] = parseTuple(args.position).map(
          (i) => Math.max(0, Math.min(100, i)) / 100
        );
        const x = percentX * encodedCostume.width;
        const y = percentY * encodedCostume.height;

        currentCanvasCursor = `url("${encodedCostume.uri}") ${x} ${y}, ${nativeCursor}`;
        updateCanvasCursor();
      } else {
        // If for some reason the costume couldn't be encoded, we'll leave the cursor unchanged.
        // This is the same behavior that would happen if we successfully encode a cursor but the browser
        // is unable to parse it for some reason.
      }

      customCursorImageName = costumeName;
    }

    hideCur() {
      this.setCur({
        cur: "none",
      });
    }

    getCur() {
      if (customCursorImageName !== null) {
        return customCursorImageName;
      }
      return nativeCursor;
    }
  }

  Scratch.extensions.register(new MouseCursor());
})(Scratch);
