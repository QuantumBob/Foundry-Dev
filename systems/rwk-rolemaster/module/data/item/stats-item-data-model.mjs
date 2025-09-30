import { BaseItemDataModel } from "../abstract/base-item-data-model.mjs";

const { NumberField, StringField, ArrayField, SchemaField } = foundry.data.fields;
const defaultString = { required: false, blank: true, trim: true, }
const defaultNumber = { required: false, integer: true, min: 0, initial: 0 }


export default class StatsItemDataModel extends BaseItemDataModel {

  static get stat() {
    return {
      stat: new StringField(defaultString),
      description: new StringField(defaultString),
      temporary: new NumberField(defaultNumber),
      potential: new NumberField(defaultNumber),
      statBonus: new NumberField(defaultNumber),
    };
  }

  static get stats() {

    return {
      Agility: new SchemaField(this.stat),
      Constitution: new SchemaField(this.stat),
      Memory: new SchemaField(this.stat),
      Reasoning: new SchemaField(this.stat),
      "Self Discipline": new SchemaField(this.stat),
      Empathy: new SchemaField(this.stat),
      Intuition: new SchemaField(this.stat),
      Presence: new SchemaField(this.stat),
      Quickness: new SchemaField(this.stat),
      Strength: new SchemaField(this.stat),
    };
  }

  static defineSchema() {
    return {
      ...super.defineSchema(),
      ...statItemDataModel(),
    };
  }
}
