export class D20RulesActor extends Actor {
    /* -------------------------------------------- */
    //#region #####

    async _preUpdate(changed, options, user) {
        // const u = await super._preUpdate(changed, options, user);
        for (const [key, value] of Object.entries(changed.system.stats)) {
            if (value !== this.system.stats[key]) {
                return this.pointSpend(this.system.stats, key, value)
            }
        }
        // return u;
    }

    //#endregion

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
}