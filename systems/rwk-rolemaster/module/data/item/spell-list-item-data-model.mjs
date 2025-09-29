import { ArrayField } from "@client/data/fields.mjs";
import { BaseItemDataModel } from "../abstract/base-item-data-model.mjs";

const { NumberField, StringField, ArrayField } = foundry.data.fields;
const defaultString = { required: false, blank: true, trim: true, }
const defaultNumber = { required: false, integer: true, positive: true, initial: 0 }

export class SpellItemDataModel extends BaseItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      listType: new StringField(defaultString),
      spells: new ArrayField({}),
      notes: new StringField(defaultString),
    };
  }
}
