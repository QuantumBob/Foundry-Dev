const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class DiceWindow extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    classes: ["dice-window"],
    position: {
      width: 100,
      height: 110,
    },
    form: {
      submitOnChange: false,
    },
    actions: {
      closeWindow: DiceWindow.closeWindow,
      nextWindow: DiceWindow.nextWindow,
    },
    window: {
      frame: false,
    },
    templatePath: "systems/no-system/templates",
  };

  /* -------------------------------------------- */

  static PARTS = {
    header: {
      template: `${this.DEFAULT_OPTIONS.templatePath}/test-app.hbs`,
    },
  };

  /* -------------------------------------------- */
  /*  Actions                                     */
  /* -------------------------------------------- */

  static closeWindow(event, target) {
    this.close();
  }

  static nextWindow(event, target) {
    console.log("nextWindow");
    CONFIG.diceChain.push(new TestApp());
    CONFIG.diceChain[CONFIG.diceChain.length - 1].render(true);
  }

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  // see F:\RPG\Foundry\Foundry-Dev\systems\dnd5e\module\applications\actor\api\base-actor-sheet.mjs
  async _onFirstRender(context, options) {
    console.log(`RWK: _onFirstRender - ${this.title} : index ${CONFIG.rwkCount++}`);
    await super._onFirstRender(context, options);

    this.element.classList.add("application");
    this.element.style.zIndex = "101";
  }

  async _renderHTML(context, options) {
    // console.log(`RWK: _renderHTML - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
    return await super._renderHTML(context, options);
  }

  async _onRender(context, options) {
    options.position.left = 100 * (CONFIG.diceChain.length + 1);
    super._onRender(context, options);
  }

  setPosition(position) {
    // console.log(`RWK: setPosition - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
    position.top = 20;
    // position.left = 100; // get mouse coords
    // position.width = 60;
    // position.height = 60;
    super.setPosition(position);
    console.log(
      `RWK: position top=${position.top} left=${position.left} width=${position.width} height=${position.height} `
    );
  }

  /** @override */
  async _prepareContext(options) {
    console.log(`RWK: _prepareContext: index ${CONFIG.rwkCount++}`);

    const icons = "systems/no-system/icons";
    const context = {
      ...(await super._prepareContext(options)),
      icon: `${icons}/dice/d20.svg`,
      label: game.i18n.localize("NOSYS.DICE.d20"),
    };
    return context;
  }
}

}