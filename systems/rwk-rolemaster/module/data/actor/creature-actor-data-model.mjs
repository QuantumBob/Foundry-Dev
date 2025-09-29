const { NumberField, StringField, SchemaField, BooleanField } = foundry.data.fields;

export class CreatureActorDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      climateCode: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      enviromentCode: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      frequencyCode: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
      level: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      movementStats: new SchemaField({
        baseRate: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
        maxPace: new StringField({ required: false, blank: true, trim: true, initial: "" }),
        mnBonus: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
        speedMS: new StringField({ required: false, blank: true, trim: true, initial: "" }),
        speedAQ: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      }),
      combatStats: new SchemaField({
        size: new StringField({ required: false, blank: true, trim: true, initial: "" }),
        crit: new StringField({ required: false, blank: true, trim: true, initial: "" }),
        hits: new StringField({ required: false, blank: true, trim: true, initial: "" }),
        armorType: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
        defensiveBonus: new NumberField({
          required: true,
          integer: true,
          min: 1,
          max: 9,
          initial: 1,
        }),
        attacks: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      }),
      encounterStats: new SchemaField({
        amount: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
        treasure: new StringField({ required: false, blank: true, trim: true, initial: "" }),
        bonusEP: new StringField({ required: false, blank: true, trim: true, initial: "" }),
        outlook: new StringField({ required: false, blank: true, trim: true, initial: "" }),
        iq: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      }),
      innateAbilities: new StringField({ required: false, blank: true, trim: true, initial: "" }),
    };
  }
}
