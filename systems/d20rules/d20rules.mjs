import { CharacterActorDataModel } from "./module/data-models/actors/character-actor-data-model.mjs";
import { CharacterActorSheet } from "./module/applications/actors/character-actor-sheet.mjs";
import { StatGenerationDataModel } from "./module/data-models/abstract/stat-generation-data-model.mjs";
import { D20RulesActor } from "./module/documents/d20rules-actor.mjs"

let debugFlag = true;
let debugActor = true;
let debugItem = false;

const setBasicConfig = () => {
  CONFIG.rwkCount = 1;
  CONFIG.overToken = false;
};

const debug = (debug = false) => {
  if (!debug) return;
  // debug status
  CONFIG.debug.applications = true;
  CONFIG.debug.documents = true;
  CONFIG.debug.hooks = true;
};

// bind keys used by test-system
const bindKeys = () => {
  // keybinding to show dice window with ALT D
  const { ALT } = foundry.helpers.interaction.KeyboardManager.MODIFIER_KEYS;
  game.keybindings.register("d20rules", "showDicetray", {
    name: "showDicetray",
    editable: [{ key: "KeyD", modifiers: [ALT] }],
    onDown: () => {
      // logic here
      CONFIG.DICETRAY.togglePopout();
      return true;
    },
    restricted: false,
    precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
  });
};

const initFoundry = () => {
  // register Actors
  CONFIG.Actor.dataModels = {
    character: CharacterActorDataModel,
  };
  CONFIG.Actor.documentClass = D20RulesActor;
  const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
  DocumentSheetConfig.registerSheet(Actor, "d20rules", CharacterActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "D20 Rules Character",
  });
  // register Items
  CONFIG.Item.dataModels = {
    statgeneration: StatGenerationDataModel,
  };
}

const getActor = (li) => {
  return game.actors.get(li.closest("[data-entry-id]").dataset.entryId);
};

const editActor = async (li) => {
  await getActor(li).sheet.render(true);
};

/* -------------------------------------------- */
/*  Hooks                                       */
/* -------------------------------------------- */

Hooks.once("init", () => {

  debug(debugFlag);

  setBasicConfig();

  bindKeys();

  initFoundry();

});

Hooks.on("ready", async () => {
  console.log("RWK: in ready");
  if (debugActor) { // auto open actor sheet
    let actor = game.actors.getName("Bill") ?? game.actors.getName("Bob");
    await actor?.sheet.render(true);
  } else if (debugItem) { // auto open actor sheet
    let item = game.items.getName("Club") ?? game.items.getName("Wood");
    await item?.sheet.render(true);
  }

  // auto open testApp
  // CONFIG.testApp.render(true);
});

Hooks.on("hoverToken", (object, hovered) => {
  CONFIG.overToken = hovered;
});
