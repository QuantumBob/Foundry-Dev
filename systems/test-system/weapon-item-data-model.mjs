import { BaseItemDataModel } from "./base-item-data-model.mjs";

export class WeaponItemDataModel extends BaseItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      damage: new NumberField({ required: true, integer: true, positive: true, initial: 5 }),
    };
  }
}
