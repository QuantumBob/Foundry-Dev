import { _getDatasets } from "../../helpers/helpers.mjs";
import { BaseCharacterActorSheet } from "./BaseCharacterActorSheet.mjs";

export class CharacterActorSheet extends BaseCharacterActorSheet {
  /* -------------------------------------------- */

  static DEFAULT_OPTIONS = {
    classes: ["rmc"],
    position: {
      width: 600,
      height: 600,
    },
    // actions: {
    //   toggleEditMode: CharacterActorSheet.toggleEditMode,
    //   configureActor: CharacterActorSheet.configureActor,
    // },
    templatePath: "systems/rwk-rmc/templates",
  };

  static PARTS = {
    header: {
      template: `${this.DEFAULT_OPTIONS.templatePath}/actor/actor-character-sheet.hbs`,
      // template: `${this.DEFAULT_OPTIONS.templatePath}/variable-list-sheet.hbs`,
    },
    tabs: {
      template: "systems/rwk-rmc/templates/actor/actor-partial-tabs.hbs",
    },
    character: {
      template: "systems/rwk-rmc/templates/actor/actor-partial-pc-common.hbs",
    },
    equipment: {
      template: "systems/rwk-rmc/templates/actor/actor-partial-pc-equipment.hbs",
    },
    notes: {
      template: "systems/rwk-rmc/templates/actor/actor-partial-pc-notes.hbs",
    },
  };

  static TABS = {
    sheet: {
      tabs: [
        { id: "character", group: "sheet", label: "RMC.TabClass.Character" },
        { id: "equipment", group: "sheet", label: "RMC.TabClass.Equipment" },
        { id: "notes", group: "sheet", label: "RMC.TabClass.Notes" },
      ],
      initial: "character",
    },
  };

  /* -------------------------------------------- */
  //#region Actions

  // static toggleEditMode(event, target) {
  //   const mode = this.constructor.MODES.PLAY;
  //   if (this.isEditable && this._mode === this.constructor.MODES.PLAY) {
  //     this._mode = this.constructor.MODES.EDIT;
  //     console.log("RWK: Editing " + this.title);
  //   } else {
  //     this._mode = this.constructor.MODES.PLAY;
  //     console.log("RWK: Cannot edit " + this.title);
  //   }
  //   this.render(true);
  // }

  // static async configureActor(event) {
  //   event.preventDefault();
  //   await new CharacterActorSheet({
  //     document: this.actor,
  //     position: {
  //       top: this.position.top + 40,
  //       left: this.position.left + (this.position.width - 400) / 2,
  //     },
  //   }).render(true);
  // }
  //#endregion
  /* -------------------------------------------- */

  /* -------------------------------------------- */
  //#region Accesors

  get title() {
    return `${game.i18n.localize("TYPES.Actor.character")} Sheet: ${this.document.name}`;
  }
  //#endregion
  /* -------------------------------------------- */

  /* -------------------------------------------- */
  //#region Methods

  // see \systems\dnd5e\module\applications\actor\api\base-actor-sheet.mjs
  /** @override */
  async _prepareContext(options) {
    console.log(
      `RWK: _prepareContext - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
    );

    //#region Foundrys _prepareContext
    /*
    async _prepareContext(options) {
      const context = await super._prepareContext(options);
      const document = this.document;
      return Object.assign(context, {
        document,
        source: document._source,
        fields: document.schema.fields,
        editable: this.isEditable,
        user: game.user,
        rootId: document.collection?.has(document.id) ? this.id : foundry.utils.randomID()
      });
    }*/
    //#endregion

    // Retrieve the data structure from the base sheet.
    // You can inspect or log the context variable to see the structure.
    // But some key properties for sheets are the actor object, the data object,
    // whether or not it's editable, the items array, and the effects array.
    const context = {
      ...(await super._prepareContext(options)),
      actor: this.actor,
      editable: this.isEditable && this._mode === this.constructor.MODES.EDIT,
      tabs: this._prepareTabs("sheet"),
    };

    // Add the actor's data to context.xyz for easier access, as well as flags.
    context.system = context.editable ? this.actor.system._source : this.actor.system;
    context.flags = this.actor.flags;
    context.items = context.document._source.items;
    context.effects = context.source.effects;

    // Prepare character data and items.
    // if (context.source.type == "character") {
    //   this._prepareCharacterData(context);
    // }

    // Add roll data for TinyMCE editors.
    context.rollData = context.actor.getRollData();

    // Prepare active effects
    // context.effects = prepareActiveEffectCategories(
    //     // A generator that returns all effects stored on the actor
    //     // as well as any items
    //     this.actor.allApplicableEffects()
    // );

    return context;
  }

  async _preparePartContext(partId, context) {
    switch (partId) {
      case "header":
        console.log("RWK: _preparePartContext - header");
        break;
      case "tabs":
        console.log("RWK: _preparePartContext - tabs");
        break;
      case "character":
        break;
      case "equipment":
        break;
      case "notes":
        break;
      default:
    }
    return context;
  }

  /* -------------------------------------------- */

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterData(context) {
    // Handle translation for ability scores.
    for (let [k, v] of Object.entries(context.system.abilities)) {
      v.label = game.i18n.localize(CONFIG.RMC.abilities[k]) ?? k;
    }
  }

  //#endregion
  /* -------------------------------------------- */
}
