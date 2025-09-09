// import * as  foundry from "./foundry/client/_module.mjs"
// import "./src/module/_types";
// import "@client/global.mjs";
// import "@common/primitives/global.mjs";
// import "@client/helpers/hooks.mjs"

// export {};
declare global {
  // not a real extension of course but simplest way for this to work with the intellisense.
  /**
   * A simple event framework used throughout Foundry Virtual Tabletop.
   * When key actions or events occur, a "hook" is defined where user-defined callback functions can execute.
   * This class manages the registration and execution of hooked callback functions.
   */
  class Hooks extends foundry.helpers.Hooks {}
  const fields = foundry.data.fields;
  const fromUuid = foundry.utils.fromUuid;
  const fromUuidSync = foundry.utils.fromUuidSync;
}
