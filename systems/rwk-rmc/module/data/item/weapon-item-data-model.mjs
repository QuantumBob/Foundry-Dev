import { BaseItemDataModel } from "../abstract/base-item-data-model.mjs";

const { NumberField, StringField } = foundry.data.fields;

export class WeaponItemDataModel extends BaseItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      damage: new NumberField({ required: true, integer: true, positive: true, initial: 5 }),
    };
  }
}
