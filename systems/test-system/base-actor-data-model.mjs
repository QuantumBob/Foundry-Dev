const { NumberField, StringField, SchemaField, BooleanField } = foundry.data.fields;

export class BaseActorDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      version: new StringField({
        required: true,
        nullable: true,
        initial: null,
        gmOnly: true,
        hint: "Version of the data model",
        label: "Version",
      }),
    };
  }
}
