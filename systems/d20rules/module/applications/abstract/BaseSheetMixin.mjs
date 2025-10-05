const { HandlebarsApplicationMixin } = foundry.applications.api;

export default function BaseSheetMixin(Base) {
  return class BaseD20RulesSheet extends HandlebarsApplicationMixin(Base) {
    static MODES = {
      PLAY: 1,
      EDIT: 2,
      CREATION: 3,
    };

    _mode = null;

    static DEFAULT_OPTIONS = {
      classes: ["d20rules"],
      window: {
        controls: [
          {
            icon: "fa-solid fa-triangle-exclamation",
            label: "D20RULES.EditMode",
            action: "toggleEditMode",
          },
        ],
      },
      actions: {
        toggleEditMode: BaseD20RulesSheet.toggleEditMode,
      },
    };

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
  };
}
