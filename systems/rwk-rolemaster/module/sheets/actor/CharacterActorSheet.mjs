import { _getDatasets } from "../../helpers/helpers.mjs";
import { BaseCharacterActorSheet } from "./BaseCharacterActorSheet.mjs";

const TextEditor = foundry.applications.ux.TextEditor.implementation;

export class CharacterActorSheet extends BaseCharacterActorSheet {
  editingDescriptionTarget = null;
  /* -------------------------------------------- */
  //#region Statics

  static DEFAULT_OPTIONS = {
    classes: ["character", "vertical-tabs", "rolemaster-font"],
    position: {
      width: 600,
      height: 600,
    },
    actions: {
      showNotes: CharacterActorSheet.showNotes,
      editDescription: CharacterActorSheet.#editDescription,
      //   configureActor: CharacterActorSheet.configureActor,
    },
    templates: "systems/rwk-rolemaster/templates",
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
    biography: {
      template: `${this.DEFAULT_OPTIONS.templates}/actor/character-biography.hbs`,
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
        { id: "combat", group: "sheet", label: "ROLEMASTER.TabClass.Combat", cssClass: "rmccombat" },
        { id: "stats", group: "sheet", label: "ROLEMASTER.TabClass.Stats", cssClass: "rmcstats" },
        { id: "equipment", group: "sheet", label: "ROLEMASTER.TabClass.Equipment", cssClass: "rmcequipment" },
        { id: "skills", group: "sheet", label: "ROLEMASTER.TabClass.Skills", cssClass: "rmcskills" },
        { id: "spells", group: "sheet", label: "ROLEMASTER.TabClass.Spells", cssClass: "rmcspells" },
        { id: "biography", group: "sheet", label: "ROLEMASTER.TabClass.Biography", cssClass: "rmcbiography" },
        { id: "notes", group: "sheet", label: "ROLEMASTER.TabClass.Notes", cssClass: "rmcnotes" },
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

  static #editDescription(event, target) {
    if (target.ariaDisabled) return;
    this.editingDescriptionTarget = target.dataset.target;
    // this.render();
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
  //#region Methods

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
    context.creation = this.actor.system.creation;

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

  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
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
      case "biography":
        return await this._prepareBiography(context);
        break;
      case "notes":
        return await this._prepareNotes(context);
        break;
      default:
    }
    return context;
  }

  async _prepareBiography(context) {
    if (this.actor.limited) return context;

    const enrichmentOptions = {
      secrets: this.actor.isOwner,
      relativeTo: this.actor,
      rollData: context.rollData,
    };
    // await TextEditor.enrichHTML(this.actor.system.details.biography.value, enrichmentOptions);
    context.enrichedBiography = await TextEditor.enrichHTML(this.actor.system.biography, {
      secrets: this.actor.isOwner,
      relativeTo: this.actor,
      rollData: context.rollData,
    });
    // DnD5e
    // biography: new SchemaField({
    //     value: new HTMLField({label: "DND5E.Biography"}),
    //     public: new HTMLField({label: "DND5E.BiographyPublic"})
    //   }, {label: "DND5E.Biography"})
    // };
    // context.enriched = {
    //   label: "DND5E.Biography",
    //   value: await TextEditor.enrichHTML(this.actor.system.details.biography.value, enrichmentOptions),
    // };
    return context;
  }

  async _prepareNotes(context) {
    if (this.actor.limited) return context;

    const enrichmentOptions = {
      secrets: this.actor.isOwner,
      relativeTo: this.actor,
      rollData: context.rollData,
    };
    // await TextEditor.enrichHTML(this.actor.system.details.notes.value, enrichmentOptions);
    context.enrichedNotes = await TextEditor.enrichHTML(this.actor.system.notes, {
      secrets: this.actor.isOwner,
      relativeTo: this.actor,
      rollData: context.rollData,
    });
    // biography: new SchemaField({
    //     value: new HTMLField({label: "DND5E.Biography"}),
    //     public: new HTMLField({label: "DND5E.BiographyPublic"})
    //   }, {label: "DND5E.Biography"})
    // };
    // context.enriched = {
    //   label: "DND5E.Biography",
    //   value: await TextEditor.enrichHTML(this.actor.system.details.biography.value, enrichmentOptions),
    // };
    return context;
  }

  _processFormData(event, form, formData) {
    // const data = super._processFormData(event, form, formData);
    const data = foundry.utils.expandObject(formData.object);
    return data;
  }

  async _processSubmitData(event, form, formData, updateData) {
    const overrides = foundry.utils.flattenObject(this.actor.overrides);
    for (const k of Object.keys(overrides)) delete formData[k];
    this.document.update(formData);
    return true;
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
      v.label = game.i18n.localize(CONFIG.ROLEMASTER.abilities[k]) ?? k;
    }
  }
  _onDropDocument(event, document) {
    if (document.type === "stat-generation")
      this.actor.system.creation = 1;
    this.render({ window: { title: this.title } });
  }

  _preRender(context, options) {
    const test = this.title;
  }


  //#endregion
}
