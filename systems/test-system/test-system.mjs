import { CharacterActorDataModel } from "./data-models/character-actor-data-model.mjs";
import { WeaponItemDataModel } from "./data-models/weapon-item-data-model.mjs";
import { CharacterActorSheet } from "./sheets/character-actor-sheet.mjs";
import { WeaponItemSheet } from "./sheets/weapon-item-sheet.mjs";
import { TestApp } from "./apps/test-app.mjs";

Hooks.on("init", () => {
  // debug status
  CONFIG.debug.applications = true;
  CONFIG.debug.documents = true;
  CONFIG.debug.hooks = true;
  console.log("test-system: in init hook");

  CONFIG.rwkCount = 1;
  CONFIG.diceVisible = false;
  CONFIG.diceChain = [];

  bindKeys();

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

Hooks.on("ready", async () => {
  console.log("RWK: in ready");
  // let actor = game.actors.getName("Bill");
  // await actor.sheet.render(true);

  // CONFIG.testApp.render(true);
});

Hooks.on("getActorContextOptions", (app, menu) => {
  console.log("RWK: getDocumentContextOptions");

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
