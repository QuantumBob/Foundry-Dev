import { BaseItemDataModel } from "../abstract/base-item-data-model.mjs";

const { NumberField, StringField, ArrayField } = foundry.data.fields;
const defaultString = { required: false, blank: true, trim: true, }
const defaultNumber = { required: false, integer: true, positive: true, initial: 0 }

export class ResistanceRollItemDataModel extends BaseItemDataModel {

  static get resistanceRoll() {
    return {
      description: new StringField(defaultString),
      race: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
      stat: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
      item: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
      special: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
      misc: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
    };
  }
  static defineSchema() {
    return {
      ...super.defineSchema(),
      ...resistanceRoll(),
    };
  }
}
