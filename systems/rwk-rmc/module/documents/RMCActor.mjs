export class RMCActor extends Actor {
  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    const hitpoints = this.system.hitpoints;
    this.system.hitpoints.value = Math.clamp(hitpoints.value, hitpoints.min, hitpoints.max);
    super.prepareData();
    console.log("system hitpoints: " + this.system.hitpoints);
  }

  // prepareDerivedData() {
  //   // Clamp health within the appropriate range.
  //   const hitpoints = this.system.hitpoints;
  //   this.system.hitpoints.value = Math.min(Math.max(hitpoints.value, hitpoints.min), hitpoints.max);
  // }

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
