const { NumberField, StringField } = foundry.data.fields;

export class BaseItemDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      rarity: new StringField({
        required: true,
        blank: false,
        options: ["common", "uncommon", "rare", "legendary"],
        initial: "common",
      }),
      price: new NumberField({ required: true, integer: true, min: 0, initial: 20 }),
    };
  }
}
