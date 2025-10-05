import { BaseDataModel } from "./base-data-model.mjs";

const { NumberField, StringField, SchemaField, BooleanField } = foundry.data.fields;

const statNumberField = { required: true, integer: true, min: 0, max: 24, initial: 24 }

export class StatGenerationDataModel extends BaseDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            generationMethod: new StringField({ required: false, blank: true, trim: true, choices: ["in-order", "random-choice", "value-choice", "points"] }),
            points: new NumberField(statNumberField),
        };
    }
}
