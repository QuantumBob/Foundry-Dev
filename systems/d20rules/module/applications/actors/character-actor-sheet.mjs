import BaseSheetMixin from "../abstract/BaseSheetMixin.mjs";
import { StatGenerationApp } from "../abstract/stat-generation-app.mjs"
const { ActorSheetV2 } = foundry.applications.sheets;

export class CharacterActorSheet extends BaseSheetMixin(ActorSheetV2) {

  /* -------------------------------------------- */
  //#region Statics
  static DEFAULT_OPTIONS = {
    classes: ["character"],
    position: {
      width: 600,
      height: 600,
    },
    window: {
      resizable: true,
      controls: [
        {
          icon: "fa-solid fa-head-side-virus",
          label: "D20RULES.CreationMode",
          action: "toggleCreationMode",
        },
      ]
    },
    form: {
      submitOnChange: true,
      // handler: CharacterActorSheet.submitHandler,
    },
    templatePath: "systems/d20rules/templates",
    actions: {
      toggleCreationMode: CharacterActorSheet.#toggleCreationMode,
      deleteStatGen: CharacterActorSheet.#deleteStatGen,
      showStatGen: CharacterActorSheet.#showStatGen
    }
  };

  static PARTS = {
    header: {
      template: `${this.DEFAULT_OPTIONS.templatePath}/actor/character-header.hbs`,
    },
    // stats: {
    //   template: `${this.DEFAULT_OPTIONS.templatePath}/actor/character-stats.hbs`,
    //   scrollable: [""],
    // },
    creation: {
      template: `${this.DEFAULT_OPTIONS.templatePath}/actor/character-creation.hbs`,
      scrollable: [""],
    }
  };

  static async submitHandler(event, form, formData) {
    // Do things with the returned FormData
    console.log("submit");
  }

  static #toggleCreationMode(event, target) {
    const mode = this.constructor.MODES.PLAY;
    if (this.isEditable && this._mode !== this.constructor.MODES.CREATION) {
      this._mode = this.constructor.MODES.CREATION;
      // console.log("RWK: Creating " + this.title);
    } else {
      this._mode = this.constructor.MODES.PLAY;
      // console.log("RWK: Cannot create " + this.title);
    }
    this.render(true);
  }

  static async #deleteStatGen(event, target) {
    const item = this.actor.items.get(target.dataset.itemId);
    await item.deleteDialog();
    const doc = await this.actor.update({ "system.creation": 0 });
    this.render({ window: { title: this.title } });
  }

  static #showStatGen(event, target) {
    new StatGenerationApp(this.actor).render(true);
  }
  //#endregion

  /* -------------------------------------------- */
  //#region Accessors
  get title() {
    return `${game.i18n.localize("TYPES.Actor.character")} Sheet: ${this.document.name}`;
  }
  //#endregion

  /* -------------------------------------------- */
  //#region Overrides
  _getHeaderControls() {
    const controls = super._getHeaderControls();
    if (!game.user.isGM) {
      let control = controls.find((c, i) => {
        if (c.action === "toggleCreationMode") {
          controls[i].visible = false;
          return true;
        }
      });
    }
    return controls;
  }

  async _prepareContext(options) {
    console.log("RWK: in _prepareContext");
    const context = {
      ...(await super._prepareContext(options)),
      actor: this.actor,
      editable: this.isEditable && this._mode === this.constructor.MODES.EDIT,
      creation: this.isEditable && this._mode == this.constructor.MODES.CREATION,
    };
    context.system = this.isEditable ? this.actor.system._source : this.actor.system;
    context.stats = this.actor.system.stats;
    context.items = this.actor.itemTypes;

    return context;
  }

  async _onDropItem(event, document) {

    let doc;
    if (document.type === "creation") {
      if (this.actor.items.some(d => d.type === "creation")) return;
      await super._onDropItem(event, document);
      doc = await document.update({ "system.status": "underway" })
      doc = await this.actor.update({ "system.creation": 1 });
      this.render({ window: { title: this.title } });
    }
    if (document.type === "statgeneration") {
      if (this.actor.items.some(d => d.type === "statgeneration")) return;
      await super._onDropItem(event, document);
      new StatGenerationApp(this).render(true);
    }
  }
  //#endregion

}
