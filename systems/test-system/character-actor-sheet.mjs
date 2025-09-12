const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

export class CharacterActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["test-system"],
    position: {
      width: 600,
      height: 600,
    },
    form: {
      submitOnChange: true,
    },
  };

  static PARTS = {
    header: {
      template: `systems/rwk-rmc/templates/actor-character-sheet.hbs`,
    },
  };

  get title() {
    return `${game.i18n.localize("TYPES.Actor.character")} Sheet: ${this.document.name}`;
  }
}
