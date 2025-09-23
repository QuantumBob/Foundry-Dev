import { _getDatasets } from "../../helpers/helpers.mjs";
import { BaseCharacterActorSheet } from "./BaseCharacterActorSheet.mjs";

export class CharacterActorSheet extends BaseCharacterActorSheet {
  /* -------------------------------------------- */
  //#region Statics

  static DEFAULT_OPTIONS = {
    classes: ["character", "vertical-tabs"],
    position: {
      width: 600,
      height: 600,
    },
    actions: {
      showNotes: CharacterActorSheet.showNotes,
      //   configureActor: CharacterActorSheet.configureActor,
    },
    templates: "systems/rwk-rmc/templates",
  };

  static PARTS = {
    header: {
      template: `${this.DEFAULT_OPTIONS.templates}/actor/character-header.hbs`,
      // template: `${this.DEFAULT_OPTIONS.templatePath}/variable-list-sheet.hbs`,
    },
    tabs: {
      id: "tabs",
      classes: ["tabs-right"],
      template: `${this.DEFAULT_OPTIONS.templates}/actor/character-tabs.hbs`,
    },
    combat: {
      template: `${this.DEFAULT_OPTIONS.templates}/actor/character-combat.hbs`,
      container: { classes: ["tab-body"], id: "tabs" },
      scrollable: [""],
    },
    stats: {
      template: `${this.DEFAULT_OPTIONS.templates}/actor/character-stats.hbs`,
      container: { classes: ["tab-body"], id: "tabs" },
      scrollable: [""],
    },
    equipment: {
      template: `${this.DEFAULT_OPTIONS.templates}/actor/character-equipment.hbs`,
      container: { classes: ["tab-body"], id: "tabs" },
      scrollable: [""],
    },
    skills: {
      template: `${this.DEFAULT_OPTIONS.templates}/actor/character-skills.hbs`,
      container: { classes: ["tab-body"], id: "tabs" },
      scrollable: [""],
    },
    spells: {
      template: `${this.DEFAULT_OPTIONS.templates}/actor/character-spells.hbs`,
      container: { classes: ["tab-body"], id: "tabs" },
      scrollable: [""],
    },
    details: {
      template: `${this.DEFAULT_OPTIONS.templates}/actor/character-details.hbs`,
      container: { classes: ["tab-body"], id: "tabs" },
      scrollable: [""],
    },
    notes: {
      template: `${this.DEFAULT_OPTIONS.templates}/actor/character-notes.hbs`,
      container: { classes: ["tab-body"], id: "tabs" },
      scrollable: [""],
    },
  };

  static TABS = {
    sheet: {
      tabs: [
        { id: "combat", group: "sheet", label: "RMC.TabClass.Combat", cssClass: "rmccombat" },
        { id: "stats", group: "sheet", label: "RMC.TabClass.Stats", cssClass: "rmcstats" },
        { id: "equipment", group: "sheet", label: "RMC.TabClass.Equipment", cssClass: "rmcequipment" },
        { id: "skills", group: "sheet", label: "RMC.TabClass.Skills", cssClass: "rmcskills" },
        { id: "spells", group: "sheet", label: "RMC.TabClass.Spells", cssClass: "rmcspells" },
        { id: "details", group: "sheet", label: "RMC.TabClass.Details", cssClass: "rmcdetails" },
        { id: "notes", group: "sheet", label: "RMC.TabClass.Notes", cssClass: "rmcnotes" },
      ],
      initial: "stats",
    },
  };
  //#endregion

  /* -------------------------------------------- */
  //#region Actions

  static showNotes(event, target) {
    // const html = target.getElementsById("notes");
    const html2 = event.currentTarget.querySelector(".notes");
    html2.classList.add("hidden");
  }

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
  //#region Accesors

  get title() {
    return `${game.i18n.localize("TYPES.Actor.character")} Sheet: ${this.document.name}`;
  }
  //#endregion

  /* -------------------------------------------- */
  //#region Methods

  _configureRenderOptions(options) {
    console.log(`RWK: _configureRenderOptions - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
    super._configureRenderOptions(options);
    // Set initial mode

    let { mode, renderContext } = options;
    if (mode === undefined && renderContext === "createItem") mode = this.constructor.MODES.EDIT;
    this._mode = mode ?? this._mode ?? this.constructor.MODES.PLAY;
  }

  async _prepareContext(options) {
    console.log(`RWK: _prepareContext - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
    const context = {
      ...(await super._prepareContext(options)),
      actor: this.actor,
      editable: this.isEditable && this._mode === this.constructor.MODES.EDIT,
      tabs: this._prepareTabs("sheet"),
    };
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
}
