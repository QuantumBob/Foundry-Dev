import BaseSheetMixin from "../abstract/BaseSheetMixin.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;

export class BaseItemSheet extends BaseSheetMixin(ItemSheetV2) {
  /* -------------------------------------------- */
  //#region Statics
  static DEFAULT_OPTIONS = {
    classes: ["item"],
    window: {
      icon: "fas fa-suitcase",
      title: "ROLEMASTER.SheetClass.Item",
      resizable: true,
      minimizable: true,
      contentClasses: ["item-sheetv2-content"],
    },
    form: {
      submitOnChange: true,
    },
    position: {
      width: 500,
      height: 600,
    },
  };
  //#endregion

  /* -------------------------------------------- */
  //#region Accesors
  get title() {
    return `${game.i18n.localize("TYPES.Item.item")} Sheet: ${this.document.name}`;
  }
  //#endregion
}
