const { NumberField, StringField, SchemaField, BooleanField } = foundry.data.fields;

export class BaseActorDataModel extends foundry.abstract.TypeDataModel {
  static mergeSchema(a, b) {
    Object.assign(a, b);
    return a;
  }
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
      migrate: new BooleanField({
        hint: "Flag to trigger migration process on next reload",
        label: "Needs Migration",
        nullable: false,
        required: true,
        initial: false,
        gmOnly: true,
      }),
    };
  }
}
