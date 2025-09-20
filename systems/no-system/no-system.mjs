import { CharacterActorDataModel } from "./data-models/character-actor-data-model.mjs";
import { CharacterActorSheet } from "./sheets/character-actor-sheet.mjs";

Hooks.on("init", () => {
  // debug status
  CONFIG.debug.applications = true;
  CONFIG.debug.documents = true;
  CONFIG.debug.hooks = true;
  console.log("no-system: in init hook");

  CONFIG.rwkCount = 1;
  CONFIG.diceChain = []

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

const getActor = (li) => {
  return game.actors.get(li.closest("[data-entry-id]").dataset.entryId);
};

const editActor = async (li) => {
  await getActor(li).sheet.render(true);
};

Hooks.on("ready", async () => {
  console.log("RWK: in ready");
  let actor = game.actors.getName("Bill");
  if (actor == undefined) actor = game.actors.getName("Bob");
  await actor?.sheet.render(true);
});

Hooks.on("getActorContextOptions", (app, menu) => {
  console.log("RWK: getDocumentContextOptions");

  menu.push({
    name: "NOSYS.SIDEBAR.EditActor",
    icon: '<i class="fa-solid fa-image"></i>',
    condition: (li) => getActor(li).canUserModify(game.user, "delete"),
    callback: (li) => editActor(li),
  });
});
