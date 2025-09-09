const { NumberField, StringField } = foundry.data.fields;

class ItemDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      rarity: new StringField({
        required: true,
        blank: false,
        options: ["common", "uncommon", "rare", "legendary"],
        initial: "common"
      }),
      price: new NumberField({ required: true, integer: true, min: 0, initial: 20 })
    };
  }
}

export class WeaponDataModel extends ItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      damage: new NumberField({ required: true, integer: true, positive: true, initial: 5 })
    };
  }
}

export class SpellDataModel extends ItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      cost: new NumberField({ required: true, integer: true, positive: true, initial: 2 })
    };
  }
}