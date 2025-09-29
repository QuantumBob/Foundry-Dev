import { SchemaField } from "@client/data/fields.mjs";
import { BaseItemDataModel } from "../abstract/base-item-data-model.mjs";
import { StatItemDataModel } from "./stat-item-data-model.mjs";

const { NumberField, StringField, ArrayField } = foundry.data.fields;
const defaultString = { required: false, blank: true, trim: true, }
const defaultNumber = { required: false, integer: true, positive: true, initial: 0 }

export class StatsItemDataModel extends BaseItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      Agility: new SchemaField({ ...StatItemDataModel.stat() }),
      Constitution: new SchemaField({ ...StatItemDataModel.stat() }),
      Memory: new SchemaField({ ...StatItemDataModel.stat() }),
      Reasoning: new SchemaField({ ...StatItemDataModel.stat() }),
      SelfDiscipline: new SchemaField({ ...StatItemDataModel.stat() }),
      Empathy: new SchemaField({ ...StatItemDataModel.stat() }),
      Intuition: new SchemaField({ ...StatItemDataModel.stat() }),
      Presence: new SchemaField({ ...StatItemDataModel.stat() }),
      Quickness: new SchemaField({ ...StatItemDataModel.stat() }),
      Strength: new SchemaField({ ...StatItemDataModel.stat() }),
    };
  }
}
