import { GuerraDosTronosActorDataModel } from "./actor/characterModel.js";
// Não vou usar por enquanto

const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;
export class GuerraDosTronosActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["guerra-dos-tronos", "sheet", "actor"],
    form: {
      closeOnSubmit: true,
      submitOnChange: false,
    },
    position: {
      width: 800,
      height: 600,
    },
    window: {
      //icon: "fas fa-crown", Se eu quiser futuramente
      title: "Ficha de Personagem",
    },

    groups: this.TABS,

  };
  static PARTS = {
    form: {
      template: "systems/guerra-dos-tronos/templates/actor/PJ-sheet.hbs",
    },
    attributes: {
      template: "systems/guerra-dos-tronos/templates/actor/partials/attributes.hbs",
    }
  };
  static TABS = {
    primary: {
      tabs: [
        { id: "attributes", label: "Habilidades" },
      ],
      initial: "attributes",
    }
  };
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.actor = this.document;
    context.system = this.document.system;
    context.tabs = this._prepareTabs("primary");

    console.log("📋 Contexto de renderização da ficha:", context);

    return context;
  }
  get title() {
    return `Guerra dos Tronos: ${this.document.name}`;
  }
}

// Inicialização do sistema
Hooks.once("init", () => {
  console.log("⚔️ GuerraDosTronos | Iniciando sistema");
  const el = document.querySelector(".sheet-tabs");
  console.log("Encontrou .sheet-tabs?", !!el);

  CONFIG.Actor.dataModels ??= {};
  CONFIG.Actor.dataModels["PJ"] = GuerraDosTronosActorDataModel;

  // Registra a ficha customizada
  foundry.documents.collections.Actors.registerSheet("guerra-dos-tronos", GuerraDosTronosActorSheet, {
    types: ["PJ"],
    makeDefault: true,
  });
});