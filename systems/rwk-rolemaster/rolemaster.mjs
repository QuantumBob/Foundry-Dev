import ROLEMASTER from "./module/helpers/config.mjs";
import { CharacterActorDataModel } from "./module/data/actor/character-actor-data-model.mjs";
import { HeroActorDataModel } from "./module/data/actor/__hero-actor-data-model.mjs";
import { CreatureActorDataModel } from "./module/data/actor/creature-actor-data-model.mjs";
import { WeaponItemDataModel } from "./module/data/item/weapon-item-data-model.mjs";
import { SpellItemDataModel } from "./module/data/item/spell-item-data-model.mjs";
import { CharacterActorSheet } from "./module/sheets/actor/CharacterActorSheet.mjs";
import { HeroActorSheet } from "./module/sheets/actor/HeroActorSheet.mjs";
import { HumanoidCreatureActorSheet } from "./module/sheets/actor/HumanoidCreatureActorSheet.mjs";
import { WeaponItemSheet } from "./module/sheets/item/WeaponItemSheet.mjs";

globalThis.rolemaster = {
  config: ROLEMASTER,
  CharacterActorDataModel,
  HeroActorDataModel,
  CreatureActorDataModel,
  WeaponItemDataModel,
  SpellItemDataModel,
  //   utils
};

let DEBUG = true;

/* -------------------------------------------- */
//#region Hooks

Hooks.once("init", () => {
  console.log("RWK: rwk-rolemaster: init hook");

  debugStatus(DEBUG);

  basicCONFIG();

  initFoundry();
});

Hooks.on("ready", async () => {
  console.log("RWK: in ready");
  let actor = game.actors.getName("Bob") ?? game.actors.getName("Bill");
  await actor?.sheet.render(true);
});

Hooks.on("preUpdateActor", async () => { });
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
  // CONFIG.ActiveEffect.legacyTransferral = false;
  // config Documents and Data Models
  // CONFIG.Actor.documentClass = RMCActor;
  CONFIG.Actor.dataModels = {
    character: CharacterActorDataModel,
    // hero: HeroActorDataModel,
    // creature: CreatureActorDataModel,
  };
  // CONFIG.Item.documentClass = RMCItem;
  CONFIG.Item.dataModels = {
    weapon: WeaponItemDataModel,
    // spell: SpellItemDataModel,
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
  DocumentSheetConfig.registerSheet(Actor, "rwk-rolemaster", CharacterActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "TYPES.Actor.character",
  });
  // DocumentSheetConfig.registerSheet(Actor, "rwk-rolemaster", HeroActorSheet, {
  //   types: ["hero"],
  //   makeDefault: false,
  //   label: "ROLEMASTER.Hero",
  // });
  // DocumentSheetConfig.registerSheet(Actor, "rwk-rolemaster", HumanoidCreatureActorSheet, {
  //   types: ["creature"],
  //   makeDefault: false,
  //   label: "ROLEMASTER.Creature",
  // });

  // Register V2 Item sheets
  DocumentSheetConfig.registerSheet(Item, "rwk-rolemaster", WeaponItemSheet, {
    makeDefault: true,
    label: "ROLEMASTER.Weapon",
  });
};
//#endregion
