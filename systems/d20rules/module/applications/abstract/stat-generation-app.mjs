import BaseAppMixin from "./BaseAppMixin.mjs"
const { ApplicationV2 } = foundry.applications.api

export class StatGenerationApp extends BaseAppMixin(ApplicationV2) {
    constructor(actor, options = {}) {
        super(options);
        this.actor = actor;
        this.clone = actor.clone({}, { keepId: true });
        // if (this.options.showVisualizer) this.#visualizer = new AdvancementVisualizer({ manager: this });
    }

    /**
     * The original actor to which changes will be applied when the process is complete.
     * @type {Actor}
     */
    actor;
    /**
     * A clone of the original actor to which the changes can be applied during the advancement process.
     * @type {Actor}
     */
    clone;

    static DEFAULT_OPTIONS = {
        classes: ["stat-gen"],
        tag: "form",
        form: {
            handler: StatGenerationApp.submitHandler,
            submitOnChange: true,
            closeOnSubmit: false
        },
        actions: {
            onButtonClick: StatGenerationApp.onButtonClick,
            rollMethod: StatGenerationApp.rollMethod,
            cancelStatGen: StatGenerationApp.cancelStatGen
        }
    }
    static PARTS = {
        buttons: {
            template: "systems/d20rules/templates/abstract/stat-generation-buttons.hbs"
        },
        random_ordered: {
            template: "systems/d20rules/templates/abstract/stat-generation-random-ordered.hbs"
        },
        random_choose: {
            template: "systems/d20rules/templates/abstract/stat-generation-random-choose.hbs"
        },
        fixed_values: {
            template: "systems/d20rules/templates/abstract/stat-generation-fixed-values.hbs"
        },
        point_spend: {
            template: "systems/d20rules/templates/abstract/stat-generation-point-spend.hbs"
        },
    }
    static async submitHandler(event, form, formData) {
        // Do things with the returned FormData
        console.log("submit");
    }
    static onButtonClick(event, target) {
        console.log(this);
    }
    static cancelStatGen(event, target) {
        console.log(this);
        this.close();
    }
    static async rollMethod(event, target) {
        console.log(this);
        const func = target.dataset.type;
        const c = await this.render({
            force: true,
            isFirstRender: false,
            showPart: 'point-spend'
        })
        // this[func](this.actor, "strenght", 20);
    }

    pointSpend = (actor, inStat, inValue) => {

        const stats = getStats(); // from datamodel
        const max = 24;
        let diff = null;
        let total = 0;
        stats.forEach((key, value) => {
            total += value;
            if (key === inStat) {
                diff = inValue - value;
            }
        });
        if (diff) {
            if (diff + total > max)
                return;
            else {
                stats[inStat] = inValue;
                update()
            }
        }
    }

    // _configureRenderParts(options) {
    //     options.parts = [];
    //     switch (options.showPart) {
    //         case 'random-ordered':
    //             options.parts.push('random_ordered')
    //             break;
    //         case 'point-spend':
    //             options.parts.push('point_spend')
    //             break;
    //         default:
    //             options.parts.push('buttons')
    //     }
    // }

    render(options) {
        super.render(options);
        let mainContent = this.element === undefined ? null : this.element.querySelector(".stat-gen-buttons");
        if (!mainContent) return;
        mainContent.remove();
    }

    _configureRenderOptions(options) {
        super._configureRenderOptions(options);
        options.parts = [];
        switch (options.showPart) {
            case 'random-ordered':
                options.parts.push('random_ordered')
                break;
            case 'point-spend':
                options.parts.push('point_spend')
                break;
            default:
                options.parts.push('buttons')
        }

    }

    async _prepareContext(options) {
        const context = {
            ...(await super._prepareContext(options)),
            actor: this.actor,

        };
        context.system = this.actor.system._source;
        context.stats = this.actor.system.stats;
        context.items = this.actor.itemTypes;

        return context;
    }
}