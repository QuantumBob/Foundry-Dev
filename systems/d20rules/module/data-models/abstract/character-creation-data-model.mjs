import { BaseDataModel } from "./base-data-model.mjs";

const { NumberField, StringField, SchemaField, BooleanField } = foundry.data.fields;

const statNumberField = { required: true, integer: true, min: 0, max: 24, initial: 24 }

export class CharacterCreationDataModel extends BaseDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            status: new StringField({ required: true, blank: false, choices: ['not started', 'underway', 'finished'], trim: true, gmOnly: true, initial: 'not started' }),
        };
    }
}
