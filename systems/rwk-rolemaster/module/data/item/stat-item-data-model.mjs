import { BaseItemDataModel } from "../abstract/base-item-data-model.mjs";

const { NumberField, StringField, ArrayField } = foundry.data.fields;
const defaultString = { required: false, blank: true, trim: true, }
const defaultNumber = { required: false, integer: true, positive: true, initial: 0 }

export class StatItemDataModel extends BaseItemDataModel {

  static get stat() {
    return {
      stat: new StringField(defaultString),
      description: new StringField(defaultString),
      temporary: new NumberField(defaultNumber),
      potential: new NumberField(defaultNumber),
      statBonus: new NumberField(defaultNumber),
    };
  }
  static defineSchema() {
    return {
      ...super.defineSchema(),
      ...stat(),
    };
  }
}
