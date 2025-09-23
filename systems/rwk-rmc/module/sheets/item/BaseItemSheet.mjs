const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;

export class BaseItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  constructor(...args) {
    super(...args);
  }
  static DEFAULT_OPTIONS = {
    form: {
      submitOnChange: true,
      closeOnSubmit: false,
    },
    classes: ["rms"],
    window: {
      icon: "fas fa-suitcase",
      title: "RMC.SheetClass.Item",
      resizable: true,
      minimizable: true,
      contentClasses: ["item-sheetv2-content"],
    },
    position: {
      width: 500,
      height: 600,
    },
  };
  static PARTS = {
    header: { template: "systems/rwk-rmc/templates/item/item-weapon-header.hbs" },
  };

  static TABS = {};
}
