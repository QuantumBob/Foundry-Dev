import { BaseItemDataModel } from "../abstract/base-item-data-model.mjs";

const { NumberField, StringField, ArrayField } = foundry.data.fields;
const defaultString = { required: false, blank: true, trim: true, }
const defaultNumber = { required: false, integer: true, positive: true, initial: 0 }

export class ProfessionItemDataModel extends BaseItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      profession: new StringField(defaultString),
      description: new StringField(defaultString),
      realm: new StringField(defaultString),
      primeStats: new ArrayField({}),
      statBonuses: new ArrayField({}),
      skillRankBonuses: new ArrayField({}),
      skillCategoryBonuses: new ArrayField({}),
    };
  }
}
