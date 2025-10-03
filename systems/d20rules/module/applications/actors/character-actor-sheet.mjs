import BaseSheetMixin from "../abstract/BaseSheetMixin.mjs";
const { ActorSheetV2 } = foundry.applications.sheets;

export class CharacterActorSheet extends BaseSheetMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["character"],
    position: {
      width: 600,
      height: 600,
    },
    window: {
      resizable: true,
    },
    form: {
      submitOnChange: true,
    },
    templatePath: "systems/d20rules/templates",
  };

  /* -------------------------------------------- */

  static PARTS = {
    header: {
      template: `${this.DEFAULT_OPTIONS.templatePath}/actor/character-header.hbs`,
    },
    stats: {
      template: `${this.DEFAULT_OPTIONS.templatePath}/actor/character-stats.hbs`,
      scrollable: [""],
    }
  };

  /* -------------------------------------------- */
  /*  Accessors                                   */
  /* -------------------------------------------- */

  get title() {
    return `${game.i18n.localize("TYPES.Actor.character")} Sheet: ${this.document.name}`;
  }

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  async _prepareContext(options) {
    const context = {
      ...(await super._prepareContext(options)),
      actor: this.actor,
      editable: this.isEditable && this._mode === this.constructor.MODES.EDIT,
    };
    context.source = this.isEditable ? this.actor.system._source : this.actor.system;
    context.stats = this.actor.system.stats;

    return context;
  }

  /* -------------------------------------------- */

  async render(options, _options) {
    // do not show the actor sheet when double clicking.
    // if (CONFIG.overToken) {
    //   this.close();
    //   CONFIG.DICETRAY.togglePopout();
    // } else {
    super.render(options, _options);
    // }
  }

  async _onDropItem(event, document) {

    let doc;
    if (document.type === "creation") {
      if (this.actor.items.some(d => d.type === "creation")) return;
      await super._onDropItem(event, document);
      doc = await document.update({ "system.status": "underway" })
      doc = await this.actor.update({ "system.creation": 1 });

    }

    this.render({ window: { title: this.title } });
  }
}
