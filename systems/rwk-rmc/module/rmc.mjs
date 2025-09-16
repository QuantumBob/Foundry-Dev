import RMC from "./helpers/config.mjs";

import { CharacterActorDataModel } from "./data/actor/character-actor-data-model.mjs";
import { HeroActorDataModel } from "./data/actor/hero-actor-data-model.mjs";
import { CreatureActorDataModel } from "./data/actor/creature-actor-data-model.mjs";
import { WeaponItemDataModel } from "./data/item/weapon-item-data-model.mjs";
import { SpellItemDataModel } from "./data/item/spell-item-data-model.mjs";

import { CharacterActorSheet } from "./sheets/actor/CharacterActorSheet.mjs";
import { HeroActorSheet } from "./sheets/actor/HeroActorSheet.mjs";
import { HumanoidCreatureActorSheet } from "./sheets/actor/HumanoidCreatureActorSheet.mjs";
import { WeaponItemSheet } from "./sheets/item/WeaponItemSheet.mjs";

globalThis.rmc = {
  config: RMC,
  CharacterActorDataModel,
  HeroActorDataModel,
  CreatureActorDataModel,
  WeaponItemDataModel,
  SpellItemDataModel,
  //   utils
};

const DEBUG = true;

Hooks.once("init", () => {
  console.log("RWK: rwk-rmc: init hook");
  // debug status
  if (DEBUG) {
    CONFIG.debug.applications = true;
    CONFIG.debug.documents = true;
    CONFIG.debug.hooks = true;
  }
  // Add custom constants for configuration.
  globalThis.rmc = game.rmc = Object.assign(game.system, rmc);
  CONFIG.rwkCount = 1;
  CONFIG.RMC = RMC;

  // CONFIG.ActiveEffect.legacyTransferral = false;
  // config Documents and Data Models
  // CONFIG.Actor.documentClass = RMCActor;
  CONFIG.Actor.dataModels = {
    character: CharacterActorDataModel,
    hero: HeroActorDataModel,
    creature: CreatureActorDataModel,
  };
  // CONFIG.Item.documentClass = RMCItem;
  CONFIG.Item.dataModels = {
    weapon: WeaponItemDataModel,
    spell: SpellItemDataModel,
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
  DocumentSheetConfig.registerSheet(Actor, "rwk-rmc", CharacterActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "TYPES.Actor.character",
  });
  DocumentSheetConfig.registerSheet(Actor, "rwk-rmc", HeroActorSheet, {
    types: ["hero"],
    makeDefault: false,
    label: "RMC.Hero",
  });
  DocumentSheetConfig.registerSheet(Actor, "rwk-rmc", HumanoidCreatureActorSheet, {
    types: ["creature"],
    makeDefault: false,
    label: "RMC.Creature",
  });

  // Register V2 Item sheets
  DocumentSheetConfig.registerSheet(Item, "rwk-rmc", WeaponItemSheet, {
    makeDefault: true,
    label: "RMC.Weapon",
  });
});

Hooks.on("ready", async () => {
  console.log("RWK: in ready");
  let actor = game.actors.getName("Bob");
  await actor.sheet.render(true);
});
