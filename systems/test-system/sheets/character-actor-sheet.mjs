const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

export class CharacterActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  /**
   * Available sheet modes.
   * @enum {number}
   */
  static MODES = {
    PLAY: 1,
    EDIT: 2,
  };

  _mode = null;

  static DEFAULT_OPTIONS = {
    classes: ["test-system"],
    position: {
      width: 600,
      height: 600,
    },
    form: {
      submitOnChange: true,
    },
    templatePath: "systems/test-system/templates/",
  };

  static PARTS = {
    header: {
      // template: `systems/test-system/templates/character-header.hbs`,
      template: `${this.DEFAULT_OPTIONS.templatePath}character-header.hbs`,
    },
  };

  get title() {
    return `${game.i18n.localize("TYPES.Actor.character")} Sheet: ${this.document.name}`;
  }

  /** @override */
  async _prepareContext(options) {
    /* see -F:\RPG\Foundry\Foundry-Dev\systems\dnd5e\module\applications\actor\api\base-actor-sheet.mjs */
    const context = {
      ...(await super._prepareContext(options)),
      actor: this.actor,
      editable: this.isEditable && this._mode === this.constructor.MODES.EDIT,
    };
    context.source = context.editable ? this.actor.system._source : this.actor.system;
    return context;
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);

    // Set initial mode
    let { mode, renderContext } = options;
    if (mode === undefined && renderContext === "createItem") mode = this.constructor.MODES.EDIT;
    this._mode = mode ?? this._mode ?? this.constructor.MODES.PLAY;
  }

  /** @override */
  async render(options) {
    await super.render(options);
  }
}
