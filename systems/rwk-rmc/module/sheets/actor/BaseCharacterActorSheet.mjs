import { _getDatasets } from "../../helpers/helpers.mjs";
const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

export class BaseCharacterActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
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
    classes: ["rmc"],
    form: {
      submitOnChange: true,
    },
    actions: {
      toggleEditMode: BaseCharacterActorSheet.toggleEditMode,
      configureActor: BaseCharacterActorSheet.configureActor,
    },
    window: {
      controls: [
        {
          // font awesome icon
          icon: "fa-solid fa-triangle-exclamation",
          // string that will be run through localization
          label: "RMC.EditMode",
          // string that MUST match one of your `actions`
          action: "toggleEditMode",
        },
      ],
    },
    // templatePath: "systems/rwk-rmc/templates",
  };

  static PARTS = {
    //   header: {
    //     template: `${this.DEFAULT_OPTIONS.templatePath}/actor-character-sheet.hbs`,
    //   },
    //   // tabs: { template: "systems/rwk-rmc/templates/actor-partial-tabs.hbs" },
    //   // character: { template: "systems/rwk-rmc/templates/actor-partial-pc-common.hbs" },
    //   // equipment: { template: 'systems/rwk-rmc/templates/actor-partial-pc-equipment.hbs' },
    //   // notes: { template: "systems/rwk-rmc/templates/actor-partial-pc-notes.hbs" },
  };

  // static TABS = {
  //   sheet: {
  //     tabs: [
  //       { id: "character", group: "sheet", label: "RMC.SheetClass.Character" },
  //       // { id: 'equipment', group: 'sheet', label: 'RMC.Equipment' },
  //       { id: "notes", group: "sheet", label: "RMC.SheetClass.Item" },
  //     ],
  //     initial: "character",
  //   },
  // };

  /* -------------------------------------------- */
  //#region Actions

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

  static async configureActor(event) {
    event.preventDefault();
    await new CharacterActorSheet({
      document: this.actor,
      position: {
        top: this.position.top + 40,
        left: this.position.left + (this.position.width - 400) / 2,
      },
    }).render(true);
  }
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

  _configureRenderOptions(options) {
    console.log(
      `RWK: _configureRenderOptions - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
    );
    super._configureRenderOptions(options);
    // Set initial mode
    let { mode, renderContext } = options;
    if (mode === undefined && renderContext === "createItem") mode = this.constructor.MODES.EDIT;
    this._mode = mode ?? this._mode ?? this.constructor.MODES.PLAY;
  }
  //#endregion
  /* -------------------------------------------- */
}
