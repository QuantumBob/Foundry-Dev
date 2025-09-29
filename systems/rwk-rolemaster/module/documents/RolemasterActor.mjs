import { log } from "../helpers/helpers.mjs";

export class RolemasterActor extends Actor {
  /** @override */
  prepareData() {
    // Calling super executes the following - data reset, prepareBaseData(), prepareEmbeddedDocuments() prepareDerivedData().
    // const hitpoints = this.system.hitpoints;
    // this.system.hitpoints.value = Math.clamp(hitpoints.value, hitpoints.min, hitpoints.max);
    super.prepareData();
    log("in prepareData");
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded documents or derived data.
  }

  /** @override */
  prepareDerivedData() {
    // Clamp health within the appropriate range.
    log("in prepareDerived");
    super.prepareDerivedData();
    // const hitpoints = this.system.hitpoints;
    // this.system.hitpoints.value = Math.min(Math.max(hitpoints.value, hitpoints.min), hitpoints.max);
  }

  async applyDamage(damage) {
    // Always take a minimum of 1 damage, and round to the nearest integer.
    damage = Math.round(Math.max(1, damage));

    // Update the health.
    const { value } = this.system.hitpoints;
    await this.update({ "system.hitpoints.value": value - damage });

    // Log a message.
    await ChatMessage.implementation.create({
      content: `${this.name} took ${damage} damage!`,
    });
  }
}
