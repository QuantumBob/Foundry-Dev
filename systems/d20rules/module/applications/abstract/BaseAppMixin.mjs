const { HandlebarsApplicationMixin } = foundry.applications.api;

export default function BaseAppMixin(Base) {
  return class BaseD20RulesApp extends HandlebarsApplicationMixin(Base) {

    static DEFAULT_OPTIONS = {
      classes: ["d20rules"],
      window: {
        frame: true
      },

    };
    _configureRenderOptions(options) {
      console.log(`RWK: _configureRenderOptions - ${this.id} : index ${CONFIG.rwkCount++}`);
      super._configureRenderOptions(options);
    }
  };
}
