import { CharacterActorDataModel } from "./character-actor-data-model.mjs";
import { WeaponItemDataModel } from "./weapon-item-data-model.mjs";

import { CharacterActorSheet } from "./character-actor-sheet.mjs";
import { WeaponItemSheet } from "./weapon-item-sheet.mjs";

Hooks.on("init", () => {
  // debug status
  CONFIG.debug.hooks = true;
  console.log("test-system: in init");

  // register data models
  CONFIG.Actor.dataModels = {
    character: CharacterActorDataModel,
  };
  CONFIG.Item.dataModels = {
    weapon: WeaponItemDataModel,
  };

  // register V2 Actor sheets
  const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
  DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.applications.sheets.ActorSheetV2);
  DocumentSheetConfig.registerSheet(Actor, "test-system", CharacterActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "Test System Character",
  });
});
