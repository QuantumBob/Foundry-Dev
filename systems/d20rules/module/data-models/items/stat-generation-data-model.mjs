import { BaseDataModel } from "../abstract/base-data-model.mjs";

const { NumberField, StringField, SchemaField, BooleanField } = foundry.data.fields;

const statNumberField = { required: true, integer: true, min: 0, max: 24, initial: 24 }

export class StatGenerationDataModel extends BaseDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            generationMethod: new StringField({required: false, blank: true, trim: true, choices: ["in-order", "random-choice", "value-choice", "points"] }),
            points: new NumberField(statNumberField),
        };
    }
    static pointCalcuation(inStat, inValue) {
        const stats = getStats(); // from datamodel
        const max = 24;
        let diff = null;
        let total = 0;
        stats.forEach( (key, value) => {
            total += value;
            if(key===inStat){
                diff = inValue - value;
            }
        });
        if(diff){
            if(diff+total > max)
                return;
            else {
                stats[inStat] = inValue;
                update()
            }
        }
    }
}
