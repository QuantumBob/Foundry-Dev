const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;

export class WeaponItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  _mode = null;

  /* -------------------------------------------- */
  //#region STATICS

  static MODES = {
    PLAY: 1,
    EDIT: 2,
  };

  static DEFAULT_OPTIONS = {
    form: {
      submitOnChange: true,
    },
    actions: {
      toggleEditMode: WeaponItemSheet.toggleEditMode,
    },
    classes: ["test-system"],
    window: {
      icon: "fas fa-suitcase",
      // title: TESTSYS.SheetClass.Item,
      resizable: true,
      minimizable: true,
      contentClasses: ["item-sheetv2-content"],
      controls: [
        {
          // font awesome icon
          icon: "fa-solid fa-triangle-exclamation",
          // string that will be run through localization
          label: "TESTSYS.EditMode",
          // string that MUST match one of your `actions`
          action: "toggleEditMode",
        },
      ],
    },
    position: {
      width: 500,
      height: 600,
    },
    templatePath: "systems/test-system/templates",
  };
  static PARTS = {
    header: { template: `${this.DEFAULT_OPTIONS.templatePath}/item/item-header.hbs` },
  };

  get title() {
    return `${game.i18n.localize("TYPES.Item.item")} Sheet: ${this.document.name}`;
  }

  static toggleEditMode(event, target) {
    const mode = this.constructor.MODES.PLAY;
    if (this.isEditable && this._mode === this.constructor.MODES.PLAY) {
      this._mode = this.constructor.MODES.EDIT;
      console.log("RWK: Editing " + this.title);
    } else {
      this._mode = this.constructor.MODES.PLAY;
      console.log("RWK: Cannot edit " + this.title);
    }
    this.render(true);
  }

  _configureRenderOptions(options) {
    console.log(`RWK: _configureRenderOptions - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
    super._configureRenderOptions(options);
    // Set initial mode
    let { mode, renderContext } = options;
    if (mode === undefined && renderContext === "createItem") mode = this.constructor.MODES.EDIT;
    this._mode = mode ?? this._mode ?? this.constructor.MODES.PLAY;
  }

  async _prepareContext(options) {
    console.log(`RWK: _prepareContext - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
    const context = {
      ...(await super._prepareContext(options)),
      item: this.item,
      editable: this.isEditable && this._mode === this.constructor.MODES.EDIT,
    };
    context.system = context.editable ? this.item.system._source : this.item.system;

    return context;
  }
}
