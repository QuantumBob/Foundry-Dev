import { BaseCreatureActorSheet } from "./BaseCreatureActorSheet.mjs";

export class HumanoidCreatureActorSheet extends BaseCreatureActorSheet {
  //* @override */
  static DEFAULT_OPTIONS = {
    classes: ["rmc"],
    position: {
      width: 600,
      height: 600,
    },
    actor: {
      type: "humanoid",
    },
    templatePath: "systems/rwk-rmc/templates",
  };

  static PARTS = {};

  static TABS = {};

  /* -------------------------------------------- */
  //#region Accesors

  get title() {
    return `${game.i18n.localize("TYPES.Actor.humanoid")} Sheet: ${this.document.name}`;
  }
  //#endregion
  /* -------------------------------------------- */

  /* -------------------------------------------- */
  //#region Methods

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    return context;
  }
  //#endregion
  /* -------------------------------------------- */
}
