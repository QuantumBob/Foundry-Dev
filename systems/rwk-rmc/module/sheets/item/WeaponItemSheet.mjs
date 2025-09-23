import { BaseItemSheet } from "./BaseItemSheet.mjs";

export class WeaponItemSheet extends BaseItemSheet {
  // constructor(...args) {
  //   super(...args);
  // }
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
    // header: { template: "systems/ars/templates/item/parts/item-header-sheetv2.hbs" },
  };

  /**
   * Tab configuration for the ARS item sheet.
   * @type {object}
   */
  static TABS = {};

  async _prepareContext(options) {
    console.log(`RWK: _prepareContext - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
    const context = {
      ...(await super._prepareContext(options)),
      item: this.item,
      editable: this.isEditable && this._mode === this.constructor.MODES.EDIT,
    };
  }
}
