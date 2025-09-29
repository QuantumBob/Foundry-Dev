import { BaseItemDataModel } from "../abstract/base-item-data-model.mjs";

const { NumberField, StringField, ArrayField } = foundry.data.fields;
const defaultString = { required: false, blank: true, trim: true, }
const defaultNumber = { required: false, integer: true, positive: true, initial: 0 }

export class BackgroundItemDataModel extends BaseItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      background: new StringField(defaultString),
      description: new StringField(defaultString),
      extraMoney: new StringField(defaultString),
      statGainRoll: new ArrayField({}),
      specialItems: new ArrayField({}),
      specialBonuses: new ArrayField({}),
    };
  }
}
