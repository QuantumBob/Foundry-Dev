import { CharacterActorDataModel } from "./module/data-models/character-actor-data-model.mjs";
import { WeaponItemDataModel } from "./module/data-models/weapon-item-data-model.mjs";
import { CharacterActorSheet } from "./module/sheets/character-actor-sheet.mjs";
import { WeaponItemSheet } from "./module/sheets/weapon-item-sheet.mjs";
import { TestApp } from "./module/applications/test-app.mjs";

let debugFlag = true;

/* -------------------------------------------- */
//#region Hooks

Hooks.on("init", () => {
  console.log("test-system: in init hook");

  debug(debugFlag);

  setBasicConfig();

  bindKeys();

  initFoundry();
});

Hooks.on("ready", async () => {
  console.log("RWK: in ready");
  // auto open actor sheet
  let actor = game.actors.getName("Bill") ?? game.actors.getName("Bob");

  await actor?.sheet.render(true);

  // auto open testApp
  // CONFIG.testApp.render(true);
});

Hooks.on("getActorContextOptions", (app, menu) => {
  console.log("RWK: getDocumentContextOptions");

  // add entry to context menu of actor sidebar
  menu.push({
    name: "TESTSYS.SIDEBAR.EditActor",
    icon: '<i class="fa-solid fa-image"></i>',
    condition: (li) => getActor(li).canUserModify(game.user, "delete"),
    callback: (li) => editActor(li),
  });
});

Hooks.on("closeTestApp", () => {
  console.log("in closeTestApp");
  CONFIG.testApp = null;
});
//#endregion

/* -------------------------------------------- */
//#region Methods

const setBasicConfig = () => {
  CONFIG.rwkCount = 1;
  // settings for dice app (TestApp class)
  CONFIG.diceVisible = false;
  CONFIG.diceChain = [];
};

const debug = (debug = false) => {
  if (!debug) return;
  // debug status
  CONFIG.debug.applications = true;
  CONFIG.debug.documents = true;
  CONFIG.debug.hooks = true;
};

const initFoundry = () => {
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
};

// bind keys used by test-system
const bindKeys = () => {
  // keybinding to show dice window with ALT D
  const { ALT } = foundry.helpers.interaction.KeyboardManager.MODIFIER_KEYS;
  game.keybindings.register("test-system", "showDice", {
    name: "ShowDice",
    editable: [{ key: "KeyD", modifiers: [ALT] }],
    onDown: () => {
      if (canvas.ready) {
        if (!CONFIG.diceVisible) {
          console.log("Opening dice window");
          // const testApp = new TestApp();
          CONFIG.diceChain.push(new TestApp());
          CONFIG.diceChain[CONFIG.diceChain.length - 1].render(true);
          CONFIG.diceVisible = true;
        } else {
          console.log("Closing dice window");
          CONFIG.diceChain[CONFIG.diceChain.length - 1].close();
          CONFIG.diceChain.pop();
          CONFIG.diceVisible = false;
        }
      }

      return true;
    },
    restricted: false,
    precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
  });
};

const getActor = (li) => {
  return game.actors.get(li.closest("[data-entry-id]").dataset.entryId);
};

const editActor = async (li) => {
  await getActor(li).sheet.render(true);
};
//#endregion
