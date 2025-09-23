const { HandlebarsApplicationMixin } = foundry.applications.api;

export default function BaseSheetMixin(Base) {
  return class BaseSheetRMC extends HandlebarsApplicationMixin(Base) {
    static MODES = {
      PLAY: 1,
      EDIT: 2,
    };

    _mode = null;

    static DEFAULT_OPTIONS = {
      classes: ["rmc"],
      window: {
        controls: [
          {
            icon: "fa-solid fa-triangle-exclamation",
            label: "RMC.EditMode",
            action: "toggleEditMode",
          },
        ],
      },
      actions: {
        toggleEditMode: BaseSheetRMC.toggleEditMode,
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
  };
}
