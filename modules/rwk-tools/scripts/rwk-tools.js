import { TablePasteDialog } from "./dialogs/table-paste-dialog.js";
import { ItemPasteDialog } from "./dialogs/item-paste-dialog.js";
import { journals2Tables } from "./lib/journals-2-tables.js";
import { changeItemType } from "./lib/change-item-type.js";
import { mergeJournals } from "./lib/merge-journals.js";
import { folderExists } from "./utilities/utils.js";
import PasteWindow from "./lib/paste-window.js";
import { DAScene } from "./dialogs/da-scene.js";
import { libWrapper } from "./shim.js";

const mod = "rwk-tools";
let system = "";
let onlyDnD = false;
let onlyDnDNote = false;

// if we wanted to expose something in the module to the global scope we so it as follows
// globalThis.RWKTOOLS = {};
const DEBUG = true;
// add listeners to init hook
Hooks.once("init", () => {
  if (DEBUG) {
    CONFIG.debug.applications = true;
    CONFIG.debug.documents = true;
    CONFIG.debug.hooks = true;
  }
  if (onlyDnD && game.system.data.id !== "dnd5e") {
    onlyDnDNote = true;
    return;
  }
  console.log("RWK: Initializing rwk-tools");

  /* -------------------------------------------- */
  //#region Helpers
  //#endregion

  /* -------------------------------------------- */
  //#region libWrapper section

  libWrapper.register(
    mod,
    "foundry.applications.sidebar.tabs.ItemDirectory.prototype._getEntryContextOptions",
    function (wrapped, ...args) {
      const changeItemTypeContextMenu = {
        name: game.i18n.localize("RWKITEM.ui.context.change.item-type"),
        icon: '<i class="fas fa-search"></i>',
        condition: game.user.isGM,
        callback: changeItemType,
      };
      return wrapped(...args).concat(changeItemTypeContextMenu);
    },
    "WRAPPER"
  );

  libWrapper.register(
    mod,
    "foundry.applications.sidebar.tabs.JournalDirectory.prototype._getEntryContextOptions",
    function (wrapped, ...args) {
      const searchTableContextOption = {
        name: game.i18n.localize("RWKTABLE.ui.context.search.table"),
        icon: '<i class="fas fa-search"></i>',
        condition: game.user.isGM,
        callback: journals2Tables,
      };
      const mergeJournalsContextOption = {
        name: game.i18n.localize("RWKJOURNAL.ui.context.merge.journals"),
        icon: '<i class="fa-solid fa-object-group rwk-icon"></i>',
        condition: game.user.isGM,
        callback: mergeJournals,
      };
      return wrapped(...args).concat(searchTableContextOption, mergeJournalsContextOption);
    },
    "WRAPPER"
  );

  libWrapper.register(
    mod,
    "foundry.applications.sidebar.tabs.JournalDirectory.prototype._getFolderContextOptions",
    function (wrapped, ...args) {
      let newContextOption = {
        name: game.i18n.localize("RWKTABLE.ui.context.search.tables"),
        icon: '<i class="fas fa-search"></i>',
        condition: game.user?.isGM,
        callback: journals2Tables,
      };
      return wrapped(...args).concat(newContextOption);
    },
    "WRAPPER"
  );

  // /* register the link click listener of the text editor */
  // libWrapper.register(mod, "TextEditor.prototype.constructor._onClickContentLink", onLeftClickJournalLink, "MIXED");
  //#endregion
});

Hooks.once("ready", async () => {
  if (onlyDnDNote) {
    ui.notifications.info("RWK Tools needs DnD5e");
    onlyDnDNote = false;
  }
});
Hooks.on("preCreateItem", (doc, data, options, userId) => {
  // only allow unique named items.
  if (game.items.getName(doc.name) && !doc.isOwned) {
    return false;
  }
});

Hooks.on("activateJournalDirectory", async (directory) => {
  if (!game.user.isGM) return;

  directory.element.querySelectorAll(".directory-list > li.folder").forEach((element) => {
    const bkColor = element.querySelector(".folder-header")?.style.background;
    let color = parseColor(bkColor, true);
    if (color.length) {
      const [hue, sat, light] = rgbToHsl(...color);
      if (light >= 50) directory.element.querySelector(".folder-header")?.classList.add("dark-title");
    }
  });
});
Hooks.on("activateItemDirectory", async (directory) => {
  if (!game.user.isGM) return;

  // if (directory?.options?.id === "items" && game.user.isGM) {
  //   let button = $(
  //     "<div class='header-actions action-buttons flexrow'><button class='rwk-import'><i class='fas fa-scroll'></i> RWK DDB Import</button></div>"
  //   );
  //   button.on("click", () => {
  //     new ItemPasteDialog().render(true);
  //   });
  //   $(html).find(".directory-header").append(button);
  // }
});
Hooks.on("activateSceneDirectory", async (directory) => {
  if (!game.user.isGM) return;

  // if (directory?.options?.id === "scenes" && game.user.isGM) {
  //   let button = $(
  //     "<div class='header-actions action-buttons flexrow'><button class='rwk-import'><i class='fas fa-scroll'></i> Import DA Map</button></div>"
  //   );
  //   button.on("click", () => {
  //     new DAScene().render(true);
  //   });
  //   $(html).find(".directory-header").append(button);
  // }
});
Hooks.on("activateRollTableDirectory", async (directory) => {
  if (game.user.isGM) {
    // Button one
    let button = document.createElement("div");
    button.classList.add("header-actions", "action-buttons", "flexrow");
    button.innerHTML = '<button class="insert-rolltable"><i class="fas fa-scroll"></i> RWK Table Import</button>';
    button.addEventListener("click", () => {
      new PasteWindow().render(true);
    });
    directory.element.querySelector(".directory-header").append(button);

    // Button two
    // button = document.createElement("div");
    // button.classList.add("header-actions", "action-buttons", "flexrow");
    // button.innerHTML = '<button class="rwk-import"><i class="fas fa-scroll"></i> RWK Table Import2</button>';
    // button.addEventListener("click", () => {
    //   new TablePasteDialog().render(true);
    // });
    // directory.element.querySelector(".directory-header").append(button);
  }
});

function parseColor(color, toNumber) {
  if (toNumber === true) {
    if (typeof color === "number") {
      return color | 0; //chop off decimal
    }
    if (typeof color === "string") {
      if (color.includes("rgb(")) {
        color = color.replace("rgb(", "");
        color = color.replace(")", "");
        const arr = color.split(", ");
        let res = arr.map((el) => {
          return parseInt(el);
        });
        return res;
      }
      if (color[0] === "#") color = color.slice(1);
    }
    return window.parseInt(color, 16);
  } else {
    if (typeof color === "number") {
      //make sure our hexadecimal number is padded out
      color = "#" + ("00000" + (color | 0).toString(16)).substr(-6);
    }

    return color;
  }
}

function rgbToHsl(r, g, b) {
  ((r /= 255), (g /= 255), (b /= 255));
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
}
