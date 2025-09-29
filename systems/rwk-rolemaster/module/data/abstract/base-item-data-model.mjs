import { AbstractrDataModel } from "./abstract-data-model.mjs";
const { NumberField, StringField, BooleanField } = foundry.data.fields;

export class BaseItemDataModel extends AbstractrDataModel {
  static defineSchema() {
    // return this.mergeSchema(super.defineSchema(), {
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
    }
    // });
  }
}
