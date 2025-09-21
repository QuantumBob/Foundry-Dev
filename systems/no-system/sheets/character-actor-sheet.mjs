import { togglePopout } from "/modules/dice-calculator/module/dice-calculator.js";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

export class CharacterActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["no-system"],
    position: {
      width: 600,
      height: 167,
    },
    form: {
      submitOnChange: true,
    },
    templatePath: "systems/no-system/templates",
  };

  /* -------------------------------------------- */

  static PARTS = {
    header: {
      template: `${this.DEFAULT_OPTIONS.templatePath}/character-sheet.hbs`,
    },
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
      // editable: this.isEditable && this._mode === this.constructor.MODES.EDIT,
    };
    // context.source = context.editable ? this.actor.system._source : this.actor.system;
    context.source = this.isEditable ? this.actor.system._source : this.actor.system;

    return context;
  }

  /* -------------------------------------------- */

  async render(options, _options) {
    // do not show the actor sheet when double clicking.
    if (CONFIG.overToken) {
      this.close();
      togglePopout();
    } else {
      super.render(options, _options);
    }
  }
}
