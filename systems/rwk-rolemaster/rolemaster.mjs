import ROLEMASTER from "./module/helpers/config.mjs";
import { log } from "./module/helpers/helpers.mjs";
import { CharacterActorDataModel } from "./module/data/actor/character-actor-data-model.mjs";
import { WeaponItemDataModel } from "./module/data/item/weapon-item-data-model.mjs";
import { SpellItemDataModel } from "./module/data/item/spell-item-data-model.mjs";
import { CharacterActorSheet } from "./module/sheets/actor/CharacterActorSheet.mjs";
import { WeaponItemSheet } from "./module/sheets/item/WeaponItemSheet.mjs";
import { RolemasterItem } from "./module/documents/RolemasterItem.mjs";
import { RolemasterActor } from "./module/documents/RolemasterActor.mjs";
import { StatGenerationItemDataModel } from "./module/data/item/stat-generation-item-data-model.mjs";
import { StatGenerationItemSheet } from "./module/sheets/item/StatGenerationItemSheet.mjs";

globalThis.rolemaster = {
  config: ROLEMASTER,
  CharacterActorDataModel,
  WeaponItemDataModel,
  SpellItemDataModel,
  //   utils
};

let DEBUG = true;
let autoLoadActor = true;

/* -------------------------------------------- */
//#region Hooks

Hooks.once("init", () => {
  console.log("RWK: rwk-rolemaster: init hook");

  debugStatus(DEBUG);

  basicCONFIG();

  initFoundry();
});

Hooks.on("setup", async () => {
  console.log("RWK: in setup");
});

Hooks.on("ready", async () => {
  console.log("RWK: in ready");
  if (autoLoadActor) {
    let actor = game.actors.getName("Bob") ?? game.actors.getName("Bill");
    await actor?.sheet.render(true);
  }
});

//#endregion

/* -------------------------------------------- */
//#region Methods

const debugStatus = (DEBUG) => {
  // debug status
  if (DEBUG) {
    CONFIG.debug.applications = true;
    CONFIG.debug.documents = true;
    CONFIG.debug.hooks = true;
  }
};

const basicCONFIG = () => {
  // Add custom constants for configuration.
  globalThis.rolemaster = game.rolemaster = Object.assign(game.system, rolemaster);
  CONFIG.rwkCount = 1;
  CONFIG.ROLEMASTER = ROLEMASTER;
};

const initFoundry = () => {
  // config Documents and Data Models
  CONFIG.Actor.documentClass = RolemasterActor;
  CONFIG.Actor.dataModels = {
    character: CharacterActorDataModel,
  };
  CONFIG.Item.documentClass = RolemasterItem;
  CONFIG.Item.dataModels = {
    weapon: WeaponItemDataModel,
    spell: SpellItemDataModel,
    statGeneration: StatGenerationItemDataModel
  };

  // CONFIG.Actor.trackableAttributes = {
  //   character: {
  //     bar: ["hitpoints"],
  //     value: [],
  //   },
  //   hero: {
  //     bar: ["hitpoints", "weapon.bonus"],
  //     value: ["defensiveBonus.total"],
  //   },
  // };

  // Register V2 Actor sheets
  const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
  DocumentSheetConfig.registerSheet(RolemasterActor, "rwk-rolemaster", CharacterActorSheet, {
    types: ["character", "test actor"],
    makeDefault: true,
    label: "TYPES.Actor.character",
  });
  // Register V2 Item sheets
  DocumentSheetConfig.registerSheet(RolemasterItem, "rwk-rolemaster", WeaponItemSheet, {
    makeDefault: true,
    label: "ROLEMASTER.Weapon",
    types: ["weapon"],
  });
  DocumentSheetConfig.registerSheet(RolemasterItem, "rwk-rolemaster", StatGenerationItemSheet, {
    makeDefault: true,
    label: "ROLEMASTER.StatGeneration",
    types: ["stat-generation"],
  });
};
//#endregion
