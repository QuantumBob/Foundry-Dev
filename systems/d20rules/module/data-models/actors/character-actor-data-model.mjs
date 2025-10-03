import { BaseDataModel } from "../abstract/base-data-model.mjs";

const { NumberField, StringField, SchemaField, BooleanField } = foundry.data.fields;

const statNumberField = { required: true, integer: true, min: 0, max: 20, initial: 0 }

export class CharacterActorDataModel extends BaseDataModel {
  static defineSchema() {
    return {
      creation: new NumberField({ gmOnly: true, initial: 0, nullable: false, required: true, integer: true, min: 0, max: 2 }),
      stats: new SchemaField({
        strength: new NumberField(statNumberField),
        dexterity: new NumberField(statNumberField),
        constitution: new NumberField(statNumberField),
        intelligence: new NumberField(statNumberField),
        wisdom: new NumberField(statNumberField),
        charisma: new NumberField(statNumberField),
      })
    };
  }
}
