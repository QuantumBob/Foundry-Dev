import { CharacterActorDataModel } from "./data-models/character-actor-data-model.mjs";
import { WeaponItemDataModel } from "./data-models/weapon-item-data-model.mjs";

import { CharacterActorSheet } from "./sheets/character-actor-sheet.mjs";
import { WeaponItemSheet } from "./sheets/weapon-item-sheet.mjs";

Hooks.on("init", () => {
  // debug status
  CONFIG.debug.applications = true;
  CONFIG.debug.documents = true;
  CONFIG.debug.hooks = true;
  console.log("test-system: in init hook");

  CONFIG.rwkCount = 1;

  // register data models
  CONFIG.Actor.dataModels = {
    character: CharacterActorDataModel,
  };
  CONFIG.Item.dataModels = {
    weapon: WeaponItemDataModel,
  };

  // register V2 Actor sheets
  const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
  // DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.applications.sheets.ActorSheetV2);
  DocumentSheetConfig.registerSheet(Actor, "test-system", CharacterActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "Test System Character",
  });
});

Hooks.on("ready", async () => {
  console.log("in ready");
  let actor = game.actors.get("XKY7wKivePzpdZ2N");
  actor.sheet.render(true);
});
