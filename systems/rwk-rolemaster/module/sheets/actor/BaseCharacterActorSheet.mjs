import { _getDatasets } from "../../helpers/helpers.mjs";
import BaseSheetMixin from "../abstract/BaseSheetMixin.mjs";
const { ActorSheetV2 } = foundry.applications.sheets;

export class BaseCharacterActorSheet extends BaseSheetMixin(ActorSheetV2) {
  /* -------------------------------------------- */
  //#region Statics
  static DEFAULT_OPTIONS = {
    classes: ["actor"],
    form: {
      submitOnChange: true,
    },
    window: {
      resizable: true,
    },
  };

  /* -------------------------------------------- */
  //#region Accesors
  get title() {
    return `${game.i18n.localize("TYPES.Actor.character")} Sheet: ${this.document.name}`;
  }
  //#endregion
}
