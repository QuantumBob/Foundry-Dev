import { BaseItemDataModel } from "../abstract/base-item-data-model.mjs";

const { NumberField, StringField } = foundry.data.fields;

export class SkillItemDataModel extends BaseItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      level: new NumberField({ required: true, integer: true, positive: true, initial: 0 }),
    };
  }
}
