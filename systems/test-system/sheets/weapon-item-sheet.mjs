const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;

export class WeaponItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  constructor(...args) {
    super(...args);
  }
  static DEFAULT_OPTIONS = {
    ...super.DEFAULT_OPTIONS,
    form: {
      submitOnChange: true,
      closeOnSubmit: false,
    },
    classes: ["test-system"],
    window: {
      icon: "fas fa-suitcase",
      title: "TESTSYS.SheetClass.Item",
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
    ...super.PARTS,
    navbar: { template: "systems/ars/templates/item/tabs/tab-navigation.hbs" },
    header: { template: "systems/ars/templates/item/parts/item-header-sheetv2.hbs" },
  };
}
