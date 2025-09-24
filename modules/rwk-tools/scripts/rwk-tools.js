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

// add listeners to init hook
Hooks.on("init", () => {
  if (onlyDnD && game.system.data.id !== "dnd5e") {
    onlyDnDNote = true;
    return;
  }
  console.log("RWK: Initializing rwk-tools");

  // game.settings.registerMenu("rwk-tools", "settings-export-menu", {
  //     name: "",
  //     label: "Export Settings",      // The text label used in the button
  //     hint: "Export all settings to JSON file.",
  //     icon: "fas fa-bars",               // A Font Awesome icon used in the submenu button
  //     type: exportSettings,   // A FormApplication subclass
  //     restricted: true                   // Restrict this submenu to gamemaster only?
  // });
  // game.settings.register("rwk-tools", "settings-export", {
  //     scope: 'world',     // "world" = sync to db, "client" = local storage
  //     config: false,       // false if you dont want it to show in module config
  //     type: Object,       // Number, Boolean, String, Object
  //     default: {},
  // });

  /* -------------------------------------------- */
  //#region Context menus

  const baseItemEntryContext = foundry.applications.sidebar.tabs.ItemDirectory.prototype._getEntryContextOptions;
  foundry.applications.sidebar.tabs.ItemDirectory.prototype._getEntryContextOptions = function () {
    const entries = game.user.isGM ? baseItemEntryContext.call(this) : [];
    if (!game.user.isGM) return entries;
    entries.push({
      name: game.i18n.localize("RWKITEM.ui.context.change.item-type"),
      icon: '<i class="fas fa-search"></i>',
      condition: game.user.isGM,
      callback: changeItemType,
    });
    return entries;
  };

  const baseJournalEntryContext = foundry.applications.sidebar.tabs.JournalDirectory.prototype._getEntryContextOptions;
  foundry.applications.sidebar.tabs.JournalDirectory.prototype._getEntryContextOptions = function () {
    const entries = game.user.isGM ? baseJournalEntryContext.call(this) : [];
    if (!game.user.isGM) return entries;
    entries.push({
      name: game.i18n.localize("RWKTABLE.ui.context.search.table"),
      icon: '<i class="fas fa-search"></i>',
      condition: game.user.isGM,
      callback: journals2Tables,
    });
    return entries;
  };

  const baseJornalFolderContext = foundry.applications.sidebar.tabs.JournalDirectory.prototype._getFolderContextOptions;
  foundry.applications.sidebar.tabs.JournalDirectory.prototype._getFolderContextOptions = function () {
    const entries = game.user.isGM ? baseJornalFolderContext.call(this) : [];
    if (!game.user.isGM) return entries;
    entries.push({
      name: game.i18n.localize("RWKTABLE.ui.context.search.tables"),
      icon: '<i class="fas fa-search"></i>',
      condition: game.user.isGM,
      callback: journals2Tables,
    });
    return entries;
  };
  //#endregion

  /* -------------------------------------------- */
  //#region Sidebar buttons

  foundry.applications.sidebar.tabs.RollTableDirectory.prototype._onFirstRender = async function (context, options) {
    console.log("in baseRollTableDirectoryFirstRender ");
    if (game.user.isGM) {
      // Button one
      let button = document.createElement("div");
      button.classList.add("header-actions", "action-buttons", "flexrow");
      button.innerHTML = '<button class="insert-rolltable"><i class="fas fa-scroll"></i> RWK Table Import</button>';
      button.addEventListener("click", () => {
        new PasteWindow().render(true);
      });

      this.element.querySelector(".directory-header").append(button);

      // Button two
      button = document.createElement("div");
      button.classList.add("header-actions", "action-buttons", "flexrow");
      button.innerHTML = '<button class="rwk-import"><i class="fas fa-scroll"></i> RWK Table Import2</button>';
      button.addEventListener("click", () => {
        new TablePasteDialog().render(true);
      });

      this.element.querySelector(".directory-header").append(button);
    }
  };
  //#endregion

  /* -------------------------------------------- */
  //#region Helpers

  foundry.applications.sidebar.tabs.JournalDirectory.prototype._onFirstRender = async function (context, options) {
    /* change text colour of journals in list to black if background is light */
    if (game.user.isGM) {
      this.element.querySelectorAll(".directory-list > li.folder").forEach((element) => {
        const bkColor = element.querySelector(".folder-header")?.style.background;
        let color = parseColor(bkColor, true);
        if (color.length) {
          const [hue, sat, light] = rgbToHsl(...color);
          if (light >= 50) this.element.querySelector(".folder-header")?.classList.add("dark-title");
        }
      });
    }
  };
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

Hooks.on("ready", async () => {
  if (onlyDnDNote) {
    ui.notifications.info("RWK Tools needs DnD5e");
    onlyDnDNote = false;
  }
  ui.notifications.info("RWK Tools is awesome!");
});
Hooks.on("preCreateItem", (item, options, sheet, userId) => {
  // only allow unique named items.
  if (game.items.getName(item.name)) {
    return false;
  }
});

Hooks.on("renderSidebarTab", async (app, html) => {
  if (!game.user.isGM) {
    return;
  }

  if (app?.options?.id === "items" && game.user.isGM) {
    let button = $(
      "<div class='header-actions action-buttons flexrow'><button class='rwk-import'><i class='fas fa-scroll'></i> RWK DDB Import</button></div>"
    );
    button.on("click", () => {
      new ItemPasteDialog().render(true);
    });
    $(html).find(".directory-header").append(button);
  }

  if (app?.options?.id === "scenes" && game.user.isGM) {
    let button = $(
      "<div class='header-actions action-buttons flexrow'><button class='rwk-import'><i class='fas fa-scroll'></i> Import DA Map</button></div>"
    );
    button.on("click", () => {
      new DAScene().render(true);
    });
    $(html).find(".directory-header").append(button);
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
