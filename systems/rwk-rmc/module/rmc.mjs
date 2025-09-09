import RMC from "./helpers/config.mjs";
import { BaseActor } from "./documents/BaseActor.mjs";
import { BaseItem } from "./documents/BaseItem.mjs";
import { CharacterDataModel, HeroDataModel, CreatureDataModel, } from "./data/abstract/actor-data-model.mjs";
import { WeaponDataModel } from "./data/abstract/item-data-model.mjs";
import { SpellDataModel } from "./data/abstract/item-data-model.mjs";
import { CharacterActorSheet } from "./sheets/CharacterActorSheet.mjs";
import { HeroActorSheet } from "./sheets/HeroActorSheet.mjs";
import { CreatureActorSheet } from "./sheets/CreatureActorSheet.mjs";
import { RMCItemSheet } from "./sheets/ItemSheet.mjs";

globalThis.rmc = {
  //   applications,
  //   canvas,
  config: RMC,
  CharacterDataModel,
  HeroDataModel,
  CreatureDataModel,
  //   enrichers,
  //   Filter,
  //   migrations,
  //   registry,
  //   utils
};

Hooks.once("init", () => {
  // Add custom constants for configuration.
  globalThis.rmc = game.rmc = Object.assign(game.system, globalThis.rmc);
  CONFIG.RMC = RMC;
  CONFIG.ActiveEffect.legacyTransferral = false;
  const test = "foo";

  // config Documents and Data Models
  CONFIG.Actor.documentClass = BaseActor;
  // Object.assign(CONFIG.Actor.dataModels, {
  CONFIG.Actor.dataModels = {
    character: CharacterDataModel,
    hero: HeroDataModel,
    creature: CreatureDataModel,
  };
  CONFIG.Item.documentClass = BaseItem;
  CONFIG.Item.dataModels = {
    weapon: WeaponDataModel,
    spell: SpellDataModel,
  };

  CONFIG.Actor.trackableAttributes = {
    character: {
      bar: ["hitpoints"],
      value: [],
    },
    hero: {
      bar: ["hitpoints", "weapon.bonus"],
      value: ["defensiveBonus.total"],
    },
  };

  // Register V2 Actor sheets
  const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;

  DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.applications.sheets.ActorSheetV2);

  DocumentSheetConfig.registerSheet(Actor, "rwk-rmc", CharacterActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "RMC.Character",
  });
  DocumentSheetConfig.registerSheet(Actor, "rwk-rmc", HeroActorSheet, {
    types: ["hero"],
    makeDefault: true,
    label: "RMC.Hero",
  });
  DocumentSheetConfig.registerSheet(Actor, "rwk-rmc", CreatureActorSheet, {
    types: ["creature"],
    makeDefault: true,
    label: "RMC.Creature",
  });

  // Register V2 Item sheets
  DocumentSheetConfig.registerSheet(Item, "rwk-rmc", RMCItemSheet, {
    makeDefault: true,
    label: "Item V2 Sheet",
  });
});
