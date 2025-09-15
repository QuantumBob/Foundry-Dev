// import SlideToggleElement from "./slide-toggle.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

// window.customElements.define("slide-toggle", SlideToggleElement);

export class CharacterActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  /**
   * Available sheet modes.
   * @enum {number}
   */
  static MODES = {
    PLAY: 1,
    EDIT: 2,
  };

  /* -------------------------------------------- */

  _mode = null;

  /* -------------------------------------------- */

  static DEFAULT_OPTIONS = {
    classes: ["test-system"],
    position: {
      width: 600,
      height: 600,
    },
    form: {
      submitOnChange: true,
    },
    actions: {
      toggleEditMode: CharacterActorSheet.toggleEditMode,
    },
    window: {
      controls: [
        {
          // font awesome icon
          icon: "fa-solid fa-triangle-exclamation",
          // string that will be run through localization
          label: "TESTSYS.EditMode",
          // string that MUST match one of your `actions`
          action: "toggleEditMode",
        },
      ],
    },
    templatePath: "systems/test-system/templates/",
  };

  /* -------------------------------------------- */

  static PARTS = {
    header: {
      template: `${this.DEFAULT_OPTIONS.templatePath}character-header.hbs`,
    },
  };

  /* -------------------------------------------- */

  get title() {
    return `${game.i18n.localize("TYPES.Actor.character")} Sheet: ${this.document.name}`;
  }

  // _renderHeaderControl(control) {
  //   console.log("RWK: header control");
  // }

  /* -------------------------------------------- */
  /*  Actions                                   */
  /* -------------------------------------------- */

  static toggleEditMode(event, target) {
    const mode = this.constructor.MODES.PLAY;
    if (this.isEditable && this._mode === this.constructor.MODES.PLAY) {
      this._mode = this.constructor.MODES.EDIT;
      console.log("RWK: Editing " + this.title);
    } else {
      this._mode = this.constructor.MODES.PLAY;
      console.log("RWK: Cannot edit " + this.title);
    }
    this.render(true);
  }

  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    /* see -F:\RPG\Foundry\Foundry-Dev\systems\dnd5e\module\applications\actor\api\base-actor-sheet.mjs */
    console.log(`RWK: ${this.document.documentName ?? "undefined"} index: ${CONFIG.rwkCount++}`);
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

  render(options) {
    super.render(options);
  }

  _updateFrame(options) {
    super._updateFrame(options);
  }

  /** @inheritDoc */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);

    // Set initial mode
    let { mode, renderContext } = options;
    if (mode === undefined && renderContext === "createItem") mode = this.constructor.MODES.EDIT;
    this._mode = mode ?? this._mode ?? this.constructor.MODES.PLAY;

    // options.window.title = options.window.title == undefined ? "undefined" : this.document.name;
  }

  /* -------------------------------------------- */
}
