const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

export class CharacterActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  //* @override */
  static DEFAULT_OPTIONS = {
    classes: ["rmc"],
    tag: "form",
    position: {
      width: 600,
      height: 600,
    },
    form: {
      // handler: DCCActorSheet.#onSubmitForm,
      submitOnChange: true,
    },
    actor: {
      type: "character",
    },
    window: {
      resizable: true,
      title: "RMC.SheetClass.Character",
    },
    // actions: {
    //   configureActor: this.#configureActor
    // }
  };

  static PARTS = {
    header: {
      template: `systems/rwk-rmc/templates/actor-${this.DEFAULT_OPTIONS.actor.type}-sheet.hbs`,
    },
    // header: { template: `systems/rwk-rmc/templates/actor-character-sheet.hbs` },
    tabs: { template: "systems/rwk-rmc/templates/actor-partial-tabs.hbs" },
    character: { template: "systems/rwk-rmc/templates/actor-partial-pc-common.hbs" },
    // equipment: { template: 'systems/rwk-rmc/templates/actor-partial-pc-equipment.hbs' },
    notes: { template: "systems/rwk-rmc/templates/actor-partial-pc-notes.hbs" },
  };

  static TABS = {
    sheet: {
      tabs: [
        { id: "character", group: "sheet", label: "RMC.Character" },
        // { id: 'equipment', group: 'sheet', label: 'RMC.Equipment' },
        { id: "notes", group: "sheet", label: "RMC.Notes" },
      ],
      initial: "character",
    },
  };

  /** @override */
  // get template() {
  //   return `systems/rwk-rmc/templates/actors/actor-character-sheet.hbs`;
  // }

  /** @override */
  async _prepareContext(options) {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = await super._prepareContext(options);

    // Use a safe clone of the actor data for further operations.
    // const actorData = context.data;

    // Add the actor's data to context.data for easier access, as well as flags.
    context.system = this.actor.system;
    context.flags = this.actor.flags;
    // context.document.sheet.title = this.options.window.title;

    // Prepare character data and items.
    // if (actorData.type == 'character') {
    //     // this._prepareCharacterData(context);
    // }

    // Add roll data for TinyMCE editors.
    // context.rollData = context.actor.getRollData();

    // Prepare active effects
    // context.effects = prepareActiveEffectCategories(
    //     // A generator that returns all effects stored on the actor
    //     // as well as any items
    //     this.actor.allApplicableEffects()
    // );
    return context;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  // _prepareCharacterData(context) {
  //     // Handle translation for ability scores.
  //     for (let [k, v] of Object.entries(context.system.abilities)) {
  //         v.label = game.i18n.localize(CONFIG.RMC.abilities[k]) ?? k;
  //     }
  // }

  //   /**
  //  * Display sheet specific configuration settings
  //  * @this {CharacterActorSheet}
  //  * @param {PointerEvent} event
  //  * @returns {Promise<void>}
  //  */
  // static async #configureActor (event) {
  //   event.preventDefault()
  //   await new CharacterActorSheet({
  //     document: this.actor,
  //     position: {
  //       top: this.position.top + 40,
  //       left: this.position.left + (this.position.width - 400) / 2
  //     }
  //   }).render(true)
  // }
}
