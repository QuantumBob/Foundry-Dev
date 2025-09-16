const { NumberField, StringField, SchemaField, BooleanField } = foundry.data.fields;

export class BaseActorDataModel extends foundry.abstract.TypeDataModel {
  /**
   * Merge two schema definitions together as well as possible.
   * @param {DataSchema} a  First schema that forms the basis for the merge. *Will be mutated.*
   * @param {DataSchema} b  Second schema that will be merged in, overwriting any non-mergeable properties.
   * @returns {DataSchema}  Fully merged schema.
   */
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
