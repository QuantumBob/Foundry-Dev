import { CharacterActorDataModel } from "./data-models/character-actor-data-model.mjs";
import { CharacterActorSheet } from "./sheets/character-actor-sheet.mjs";

/* -------------------------------------------- */
/*  Hooks                                     */
/* -------------------------------------------- */

Hooks.once("init", () => {
  CONFIG.overToken = false;
  // register data models
  CONFIG.Actor.dataModels = {
    character: CharacterActorDataModel,
  };
  // register V2 Actor sheets
  const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
  DocumentSheetConfig.registerSheet(Actor, "no-system", CharacterActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "No System Character",
  });
});

Hooks.on("hoverToken", (object, hovered) => {
  CONFIG.overToken = hovered;
});
