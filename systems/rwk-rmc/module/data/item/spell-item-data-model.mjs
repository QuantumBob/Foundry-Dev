import { BaseItemDataModel } from "../abstract/base-item-data-model.mjs";

const { NumberField, StringField } = foundry.data.fields;

export class SpellItemDataModel extends BaseItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      cost: new NumberField({ required: true, integer: true, positive: true, initial: 2 }),
    };
  }
}
