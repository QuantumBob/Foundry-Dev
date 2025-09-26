import { BaseActorDataModel } from "../abstract/base-actor-data-model.mjs";

const { NumberField, StringField, SchemaField, BooleanField } = foundry.data.fields;

export class CharacterActorDataModel extends BaseActorDataModel {
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      notes: new SchemaField(
        {
          value: new HTMLField({ label: "Notes" }),
          public: new HTMLField({ label: "Notes Public" }),
        },
        { label: "Notes" }
      ),
    });
  }
}
