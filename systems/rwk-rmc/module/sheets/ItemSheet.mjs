const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;


export class RMCItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
     constructor(...args) {
        super(...args);
    }
    static DEFAULT_OPTIONS = {
        ...super.DEFAULT_OPTIONS,
        form: {
            submitOnChange: true,
            closeOnSubmit: false,
        },
        classes: ['rms'],
        window: {
            icon: 'fas fa-suitcase',
            title: 'RMC.SheetClass.Item',
            resizable: true,
            minimizable: true,
            contentClasses: ['item-sheetv2-content'],
        },
        position: {
            width: 500,
            height: 600,
        },
    };
    static PARTS = {
        ...super.PARTS,
        navbar: { template: 'systems/ars/templates/item/tabs/tab-navigation.hbs' },
        header: { template: 'systems/ars/templates/item/parts/item-header-sheetv2.hbs' },

        description: {
            template: 'systems/ars/templates/item/tabs/item-desctab-sheetv2.hbs',
            scrollable: [''],
        },
        attributes: { template: 'systems/ars/templates/item/tabs/item-attributestab-sheetv2.hbs', scrollable: [''] },
        actions: { template: 'systems/ars/templates/item/tabs/item-actionstab-sheetv2.hbs', scrollable: [''] },

        effects: { template: 'systems/ars/templates/item/tabs/item-effectstab-sheetv2.hbs', scrollable: [''] },
        contents: { template: 'systems/ars/templates/item/tabs/item-contentstab-sheetv2.hbs', scrollable: [''] },
    };

    /**
     * Tab configuration for the ARS item sheet.
     * @type {object}
     */
    static TABS = {
        ...super.TABS,

        primary: {
            tabs: [
                {
                    id: 'description',
                    icon: 'fas fa-feather',
                    label: 'ARS.sheet.item.description',
                    tooltip: 'ARS.sheet.item.tooltip.description',
                },
                {
                    id: 'attributes',
                    icon: 'fas fa-cogs',
                    label: 'ARS.sheet.item.attributes',
                    tooltip: 'ARS.sheet.item.tooltip.attributes',
                },

                {
                    id: 'actions',
                    icon: 'fas fa-hand',
                    label: 'ARS.sheet.item.actions',
                    tooltip: 'ARS.sheet.item.tooltip.actions',
                },

                {
                    id: 'effects',
                    icon: 'fas fa-bolt',
                    label: 'ARS.sheet.item.effects',
                    tooltip: 'ARS.sheet.item.tooltip.effects',
                },
                {
                    id: 'contents',
                    icon: 'fas fa-treasure-chest',
                    label: 'ARS.sheet.item.contents',
                    tooltip: 'ARS.sheet.item.tooltip.contents',
                },
            ],
            initial: 'description',
        },
    };

}