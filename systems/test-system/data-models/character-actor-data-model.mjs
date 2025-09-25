import { BaseActorDataModel } from "./base-actor-data-model.mjs";

const { NumberField, StringField, SchemaField, BooleanField } = foundry.data.fields;

export class CharacterActorDataModel extends BaseActorDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      description: new StringField({ blank: true }),
      hitpoints: new NumberField({ required: true, integer: true, positive: true, initial: 1 }),
    };
  }
}
