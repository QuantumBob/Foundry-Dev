const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

export class BaseCreatureActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  //* @override */
  static DEFAULT_OPTIONS = {
    classes: ["rmc"],
    form: {
      submitOnChange: true,
    },
    actor: {
      type: "creature",
    },
    window: {
      resizable: true,
      title: "RMC.SheetClass.Character",
    },
  };

  static PARTS = {};

  static TABS = {};
}
