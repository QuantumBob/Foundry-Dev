import { CharacterActorDataModel } from "./module/data-models/actors/character-actor-data-model.mjs";
import { CharacterActorSheet } from "./module/applications/actors/character-actor-sheet.mjs";

let debugFlag = true;

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
  // register data models
  CONFIG.Actor.dataModels = {
    character: CharacterActorDataModel,
  };
  // register V2 Actor sheets
  const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
  DocumentSheetConfig.registerSheet(Actor, "d20rules", CharacterActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "D20 Rules Character",
  });
}

/* -------------------------------------------- */
/*  Hooks                                       */
/* -------------------------------------------- */

Hooks.once("init", () => {

  debug(debugFlag);

  setBasicConfig();

  bindKeys();

  initFoundry();



});

Hooks.on("hoverToken", (object, hovered) => {
  CONFIG.overToken = hovered;
});
