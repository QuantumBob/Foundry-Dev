import { BaseItemDataModel } from "../abstract/base-item-data-model.mjs";

const { NumberField, StringField, ArrayField } = foundry.data.fields;
const defaultString = { required: false, blank: true, trim: true, }
const defaultNumber = { required: false, integer: true, positive: true, initial: 0 }


export class CharacterCreationDataModel extends BaseItemDataModel {

    static defineSchema() {
        return {
            ...super.defineSchema(),
            status: new StringField({ required: true, blank: false, choices: ['not started', 'underway', 'finished'], trim: true, gmOnly: true, initial: 'not started' })
        };
    }
}