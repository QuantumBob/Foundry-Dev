import { BaseItemSheet } from "./BaseItemSheet.mjs";

export class StatGenerationItemSheet extends BaseItemSheet {
  /* -------------------------------------------- */
  //#region Statics
  static DEFAULT_OPTIONS = {
    classes: ["stat-generation"],
  };
  static PARTS = {
    header: { template: "systems/rwk-rolemaster/templates/item/stat-generation-sheet.hbs" },
  };
  //#endregion

  _configureRenderOptions(options) {
    console.log(`RWK: _configureRenderOptions - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
    super._configureRenderOptions(options);
  }

  async _prepareContext(options) {
    console.log(`RWK: _prepareContext - ${this.document.name} : index ${CONFIG.rwkCount++}`);
    const context = {
      ...(await super._prepareContext(options)),
      item: this.item,
    };
    return context;
  }
}
