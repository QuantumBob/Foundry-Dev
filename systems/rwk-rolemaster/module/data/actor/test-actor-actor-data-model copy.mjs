import { BaseActorDataModel } from "../abstract/base-actor-data-model.mjs";

const { NumberField, StringField, SchemaField, BooleanField, HTMLField } = foundry.data.fields;

export class TestActorActorDataModel extends BaseActorDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      testy: new NumberField({ required: true, integer: true, positive: true, initial: 600 })
    }
  }
}
