import { BaseItemDataModel } from "../abstract/base-item-data-model.mjs";

const { NumberField, StringField } = foundry.data.fields;
const defaultString = { required: false, blank: true, trim: true, }
const defaultNumber = { required: false, integer: true, positive: true, initial: 0 }

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
      type: new StringField(defaultString),
      damage: new NumberField({ required: false, integer: true, positive: true, initial: 5 }),
      weight: new NumberField(defaultNumber),
      productionTime: new NumberField(defaultNumber),
      breakage: new StringField(defaultString),
      weaponStrength: new StringField(defaultString),
      fumble: new StringField(defaultString),
    });
  }
}
