import { BooleanField } from "@client/data/fields.mjs";
import { BaseItemDataModel } from "../abstract/base-item-data-model.mjs";

const { NumberField, StringField, BooleanField } = foundry.data.fields;
const defaultString = { required: false, blank: true, trim: true, }
const defaultNumber = { required: false, integer: true, positive: true, initial: 0 }

export class SpellItemDataModel extends BaseItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      description: new StringField(defaultString),
      definition: new StringField(defaultString),
      level: new NumberField(defaultNumber),
      list: new StringField(defaultString),
      RRMod: new NumberField(defaultNumber),
      instantaneous: new BooleanField({}),
      powerPoints: new NumberField(defaultNumber),
      spellType: new StringField(defaultString),
      spellSubtype: new StringField(defaultString),
      areaOfEffect: new StringField(defaultString),
      duration: new NumberField(defaultNumber), // -1 for variable
      concentration: BooleanField({}),
      permanent: new BooleanField({}),
      range: new StringField(defaultString),
    };
  }
}
