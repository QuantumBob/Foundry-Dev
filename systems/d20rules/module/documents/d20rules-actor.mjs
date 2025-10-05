export class D20RulesActor extends Actor {
    /* -------------------------------------------- */
    //#region Overrides

    async _preUpdate(changed, options, user) {
        let updateStat = false;
        for (const [key, value] of Object.entries(changed.system.stats)) {
            if (value !== this.system.stats[key]) {
                updateStat = this.pointSpend(this.system.stats, key, value);
                if (!updateStat)
                    this.render();
            }
        }
        return updateStat;
    }
    prepareData() {
        console.log("RWK: in prepareData");
        super.prepareData();
    }

    //#endregion

    /* -------------------------------------------- */
    //#region Methods
    pointSpend(stats, inStat, inValue) {

        const max = 24;
        let diff = null;
        let total = 0;
        for (const [key, value] of Object.entries(stats)) {

            total += value;
            if (key === inStat) {
                diff = inValue - value;
            }
        };
        if (diff) {
            if (diff + total > max)
                return false;
            else {
                return true;
            }
        }
    }
    //#endregion

}