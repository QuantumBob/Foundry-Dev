import { BaseActorDataModel } from "../abstract/base-actor-data-model.mjs";

const { NumberField, StringField, SchemaField, BooleanField } = foundry.data.fields;

export class CharacterActorDataModel extends BaseActorDataModel {
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      profession: new StringField({ required: false, blank: true, trim: true, initial: "fighter" }),
      race: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      realm: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      xp: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      level: new NumberField({ required: true, integer: true, min: 0, initial: 0, max: 30 }),
      sex: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      age: new NumberField({ required: true, integer: true, min: 15, initial: 15 }),
      appearance: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      hair: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      height: new NumberField({ required: true, integer: true, min: 0, initial: 0, max: 30 }),
      weight: new NumberField({ required: true, integer: true, min: 0, initial: 0, max: 30 }),
    });
  }

  _onUpdate(changed, options, userId) {
    super._onUpdate(changed, options, userId);
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    // Determine the hero's current level.
    //this.level = Math.floor(this.progress / 5);
  }
}
