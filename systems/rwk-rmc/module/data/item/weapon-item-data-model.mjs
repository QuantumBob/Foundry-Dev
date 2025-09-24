import { BaseItemDataModel } from "../abstract/base-item-data-model.mjs";

const { NumberField, StringField } = foundry.data.fields;

export class WeaponItemDataModel extends BaseItemDataModel {
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      description: new StringField({
        required: false,
        blank: true,
        trim: true,
        initial: "A Weapon",
      }),
      rarity: new StringField({
        required: false,
        blank: true,
        options: ["common", "uncommon", "rare", "legendary"],
        initial: "common",
      }),
      price: new NumberField({ required: false, integer: true, min: 0, initial: 20 }),
      damage: new NumberField({ required: false, integer: true, positive: true, initial: 5 }),
    });
  }
}
