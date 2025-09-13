import { BaseActorDataModel } from "./base-actor-data-model.mjs";

const { NumberField, StringField, SchemaField, BooleanField } = foundry.data.fields;

export class CharacterActorDataModel extends BaseActorDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      profession: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      race: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      level: new NumberField({ required: true, integer: true, min: 0, initial: 0, max: 30 }),
      sex: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      age: new NumberField({ required: true, integer: true, min: 15, initial: 15 }),
      appearance: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      hitpoints: new SchemaField({
        min: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        max: new NumberField({ required: true, integer: true, min: 0, initial: 3 }),
        value: new NumberField({ required: true, integer: true, min: 0, initial: 1 }),
      }),
    };
  }
}
