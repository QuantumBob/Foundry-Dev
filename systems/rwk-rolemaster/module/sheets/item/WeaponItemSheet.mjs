import { BaseItemSheet } from "./BaseItemSheet.mjs";

export class WeaponItemSheet extends BaseItemSheet {
  /* -------------------------------------------- */
  //#region Statics
  static DEFAULT_OPTIONS = {
    classes: ["weapon"],
  };
  static PARTS = {
    header: { template: "systems/rwk-rolemaster/templates/item/item-weapon-header.hbs" },
  };
  //#endregion

  async _processSubmitData(event, form, formData, updateData) {
    const overrides = foundry.utils.flattenObject(this.actor.overrides);
    for (const k of Object.keys(overrides)) delete submitData[k];
    this.document.update(submitData);
  }

  _configureRenderOptions(options) {
    console.log(`RWK: _configureRenderOptions - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
    super._configureRenderOptions(options);
    // Set initial mode

    let { mode, renderContext } = options;
    if (mode === undefined && renderContext === "createItem") mode = this.constructor.MODES.EDIT;
    this._mode = mode ?? this._mode ?? this.constructor.MODES.PLAY;
  }

  async _prepareContext(options) {
    console.log(`RWK: _prepareContext - ${this.document.name} : index ${CONFIG.rwkCount++}`);
    const context = {
      ...(await super._prepareContext(options)),
      item: this.item,
      editable: this.isEditable && this._mode === this.constructor.MODES.EDIT,
    };
    context.system = context.editable ? this.item.system._source : this.item.system;
    return context;
  }
}
