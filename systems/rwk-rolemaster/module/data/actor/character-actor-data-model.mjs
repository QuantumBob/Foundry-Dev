import { BaseActorDataModel } from "../abstract/base-actor-data-model.mjs";
import StatsItemDataModel from "../item/stats-item-data-model.mjs"

const { NumberField, StringField, SchemaField, BooleanField, HTMLField } = foundry.data.fields;

export class CharacterActorDataModel extends BaseActorDataModel {
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      creation: new NumberField({ gmOnly: true, initial: 0, nullable: false, required: true, integer: true, min: 0, max: 2, choices: { 0: "Character Creation not started", 1: "Character creation under way", 2: "Character creation complete" } }),
      profession: new StringField({ required: false, blank: true, trim: true, initial: "fighter" }),
      race: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      realm: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      xp: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      level: new NumberField({ required: true, integer: true, min: 0, initial: 0, max: 30 }),
      sex: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      age: new NumberField({ required: true, integer: true, min: 15, initial: 15 }),
      appearance: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      hair: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      height: new NumberField({ required: true, integer: true, min: 0, initial: 0, max: 30 }),
      weight: new NumberField({ required: true, integer: true, min: 0, initial: 0, max: 30 }),
      biography: new StringField({ required: true, blank: true }),
      notes: new StringField({ required: true, blank: true }),
      stats: new SchemaField({ ...StatsItemDataModel.stats }),
      languages: new SchemaField({}),
      defensiveBonus: new SchemaField({
        armourType: new StringField({ required: false, blank: true, trim: true, initial: "" }),
        aromourTypeCode: new NumberField({
          required: true,
          integer: true,
          min: 1,
          max: 9,
          initial: 1,
        }),
        quicknessBonus: new NumberField({
          required: true,
          integer: true,
          min: 1,
          max: 9,
          initial: 1,
        }),
        magicBonus: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
        maBonus: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
        shieldBonus: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
        otherBonus: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
        total: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
      }),
      weapon: new SchemaField({}),
      equipment: new SchemaField({
        name: new StringField({ required: false, blank: true, trim: true, initial: "" }),
        location: new StringField({ required: false, blank: true, trim: true, initial: "" }),
        weight: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
      }),
      martialArts: new SchemaField({}),
      bmr: new NumberField({ required: true, integer: true, min: 1, max: 9, initial: 1 }),
      weightAllowance: new NumberField({
        required: true,
        integer: true,
        min: 1,
        max: 9,
        initial: 1,
      }),
      encumberance: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      treasure: new SchemaField({
        mp: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        pp: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        gp: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        sp: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        bp: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        cp: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        tp: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        other: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      }),
      skills: new SchemaField({}),
      spells: new SchemaField({}),
    });
  }

  _onUpdate(changed, options, userId) {
    super._onUpdate(changed, options, userId);
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    // Determine the hero's current level.
    //this.level = Math.floor(this.progress / 5);
  }
}
