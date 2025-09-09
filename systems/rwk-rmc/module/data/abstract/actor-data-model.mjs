const {  NumberField, StringField, SchemaField, BooleanField } = foundry.data.fields;


class ActorDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
            version: new StringField({
                required: true,
                nullable: true,
                initial: null,
                default: null,
                gmOnly: true,
                hint: 'Version of the data model',
                label: 'Version',
            }),
            migrate: new BooleanField({
                hint: 'Flag to trigger migration process on next reload',
                label: 'Needs Migration',
                nullable: false,
                required: true,
                initial: false,
                default: false,
                gmOnly: true,
            }),
        };
    }
}

export class CharacterDataModel extends ActorDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            profession: new StringField({required: false, blank: true, trim: true, initial: '' }),
            race: new StringField({required: false, blank: true, trim: true, initial: '' }),
            realm: new StringField({required: false, blank: true, trim: true, initial: '' }),
            xp: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            level: new NumberField({ required: true, integer: true, min: 0, initial: 0, max: 30 }),
            sex: new StringField({required: false, blank: true, trim: true, initial: '' }),
            age: new NumberField({ required: true, integer: true, min: 15, initial: 15 }),
            appearance: new StringField({required: false, blank: true, trim: true, initial: '' }),
            hair: new StringField({required: false, blank: true, trim: true, initial: '' }),
            height: new NumberField({ required: true, integer: true, min: 0, initial: 0, max: 30 }),
            weight: new NumberField({ required: true, integer: true, min: 0, initial: 0, max: 30 }),
            hitpoints: new SchemaField({
                min: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                max: new NumberField({required: true, integer: true, min: 0, initial: 3}),
                value: new NumberField({required: true, integer: true, min: 0, initial: 1})
            }),
            powerpoints: new SchemaField({
                min: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                value: new NumberField({required: true, integer: true, min: 0, initial: 1}),
                max: new NumberField({required: true, integer: true, min: 0, initial: 3})
            })
        };
    }

//     prepareDerivedData() {
//         super.prepareDerivedData();

//         // Determine the hero's current level.
//         this.level = Math.floor(this.progress / 5);
//   }
}

export class HeroDataModel extends CharacterDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            stats: new SchemaField({}),
            languages: new SchemaField({}),
            defensiveBonus: new SchemaField({
                armourType: new StringField({required: false, blank: true, trim: true, initial: '' }),
                aromourTypeCode: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                quicknessBonus:  new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                magicBonus: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                maBonus:  new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                shieldBonus: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                otherBonus:  new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                total: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1})
            }),
            weapon: new SchemaField({
                name: new StringField({required: false, blank: true, trim: true, initial: '' }),
                bonus: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                atSeventeentoTwenty:  new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                atThirteentoSixteen: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                atNinetoTwelve:  new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                atFivetoEight: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                atOnetoFour:  new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1})
            }),
            martialArts: new SchemaField({
                name: new StringField({required: false, blank: true, trim: true, initial: '' }),
                defensiveBonus: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                sw:  new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                th: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                rankOne:  new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                rankTwo: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                rankThree:  new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                rankFour:  new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1})
            }),
            resistanceRolls: new SchemaField({
                essence: new SchemaField({
                    race: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    stat: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    item: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    special: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    misc: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1})
                }),
                channeling: new SchemaField({
                    race: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    stat: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    item: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    special: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    misc: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1})
                }),
                mentalism: new SchemaField({
                    race: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    stat: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    item: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    special: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    misc: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1})
                }),
                disease: new SchemaField({
                    race: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    stat: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    item: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    special: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    misc: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1})
                }),
                poison: new SchemaField({
                    race: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    stat: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    item: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    special: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                    misc: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1})
                })
            }),
            equipment: new SchemaField({
                name: new StringField({required: false, blank: true, trim: true, initial: '' }),
                location: new StringField({required: false, blank: true, trim: true, initial: '' }),
                weight:  new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1})
            }),
            bmr: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
            weightAllowance:  new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
            encumberance: new StringField({required: false, blank: true, trim: true, initial: '' }),
            treasure: new SchemaField({
                mp: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                pp: new NumberField({required: true, integer: true, min: 0,  initial: 0}),
                gp: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                sp: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                bp: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                cp: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                tp: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                other: new NumberField({required: true, integer: true, min: 0, initial: 0})
            }),
            skills: new SchemaField({
                name: new StringField({required: false, blank: true, trim: true, initial: '' }),
                cost: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                rank: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                rankBonus: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                statBonus: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                levelBonus: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                item: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                special: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                special2: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                misc: new NumberField({required: true, integer: true, min: 0, initial: 0})
            }),
            spells: new SchemaField({
                name: new StringField({required: false, blank: true, trim: true, initial: '' }),
                level: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                chance: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            }),

        }
    }

}

export class CreatureDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
            climateCode: new StringField({required: false, blank: true, trim: true, initial: '' }),
            enviromentCode: new StringField({required: false, blank: true, trim: true, initial: '' }),
            frequencyCode: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
            level: new StringField({required: false, blank: true, trim: true, initial: ''}),
            movementStats: new SchemaField({
                baseRate: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                maxPace: new StringField({required: false, blank: true, trim: true, initial: '' }),
                mnBonus: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                speedMS: new StringField({required: false, blank: true, trim: true, initial: '' }),
                speedAQ: new StringField({required: false, blank: true, trim: true, initial: '' })
            }),
            combatStats: new SchemaField({
                size: new StringField({required: false, blank: true, trim: true, initial: '' }),
                crit: new StringField({required: false, blank: true, trim: true, initial: '' }),
                hits: new StringField({required: false, blank: true, trim: true, initial: '' }),
                armorType: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                defensiveBonus: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                attacks: new StringField({required: false, blank: true, trim: true, initial: '' })
            }),
            encounterStats: new SchemaField({
                amount: new NumberField({required: true, integer: true, min: 1, max: 9, initial: 1}),
                treasure: new StringField({required: false, blank: true, trim: true, initial: '' }),
                bonusEP: new StringField({required: false, blank: true, trim: true, initial: '' }),
                outlook: new StringField({required: false, blank: true, trim: true, initial: '' }),
                iq: new StringField({required: false, blank: true, trim: true, initial: '' })
            }),
            innateAbilities: new StringField ({required: false, blank: true, trim: true, initial: '' })
        };
    }
}

