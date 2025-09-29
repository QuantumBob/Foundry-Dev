import { BaseItemDataModel } from "../abstract/base-item-data-model.mjs";

const { NumberField, StringField, ArrayField } = foundry.data.fields;
const defaultString = { required: false, blank: true, trim: true, }
const defaultNumber = { required: false, integer: true, positive: true, initial: 0 }

export class SkillItemDataModel extends BaseItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      group: new StringField(defaultString),
      category: new StringField(defaultString),
      Description: new StringField(defaultString),
      statBonuses: new ArrayField({}),
      skillRankBonusProgression: new StringField(defaultString),
      skillCategoryBonusProgression: new StringField(defaultString),
      classification: new StringField(defaultString),
      Modifiers: [],
      level: new NumberField({ required: true, integer: true, positive: true, initial: 0 }),
    };
  }
}
