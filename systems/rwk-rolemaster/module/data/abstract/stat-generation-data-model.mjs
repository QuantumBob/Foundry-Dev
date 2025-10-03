import { BaseItemDataModel } from "./base-item-data-model.mjs";

const { NumberField, StringField, ArrayField } = foundry.data.fields;
const defaultString = { required: false, blank: true, trim: true, }
const defaultNumber = { required: false, integer: true, positive: true, initial: 0 }

export class StatGenerationDataModel extends BaseItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      points: new NumberField({ required: true, integer: true, positive: true, initial: 660 }),
      randomPoints: new NumberField({ required: false, integer: true, min: 610, max: 700 }),
      pointsLeft: new NumberField({ required: false, integer: true, min: 0, max: 700 }),
    };
  }
  static pointCost(statValue) {
    if (statValue <= 90) {
      return statValue;
    } else {
      return (90 + Math.pow((statValue - 90), 2));
    }

  }
}
