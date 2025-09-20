// import SlideToggleElement from "./slide-toggle.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

// window.customElements.define("slide-toggle", SlideToggleElement);

export class CharacterActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  /**
   * Available sheet modes.
   * @enum {number}
   */
  static MODES = {
    PLAY: 1,
    EDIT: 2,
  };

  /* -------------------------------------------- */

  _mode = null;

  /* -------------------------------------------- */

  static DEFAULT_OPTIONS = {
    classes: ["test-system"],
    position: {
      width: 600,
      height: 600,
    },
    form: {
      submitOnChange: true,
    },
    actions: {
      toggleEditMode: CharacterActorSheet.toggleEditMode,
    },
    window: {
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
    templatePath: "systems/test-system/templates",
  };

  /* -------------------------------------------- */

  static PARTS = {
    header: {
      template: `${this.DEFAULT_OPTIONS.templatePath}/character-header.hbs`,
    },
  };

  /* -------------------------------------------- */
  /*  Actions                                     */
  /* -------------------------------------------- */

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

  /* -------------------------------------------- */
  /*  Accessors                                   */
  /* -------------------------------------------- */

  get title() {
    return `${game.i18n.localize("TYPES.Actor.character")} Sheet: ${this.document.name}`;
  }

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  /* -------------------------------------------- */
  //#region Unused

  // _attachFrameListeners() {
  //   console.log(
  //     `RWK: _attachFrameListeners - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   super._attachFrameListeners();
  // }

  // _canDragDrop(selector) {
  //   console.log(`RWK: _canDragDrop - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._canDragDrop(selector);
  // }

  // _canDragStart(selector) {
  //   console.log(`RWK: _canDragStart - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._canDragStart(selector);
  // }

  // _canRender(options) {
  //   console.log(`RWK: _canRender - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._canRender(options);
  // }

  //#endregion

  _configureRenderOptions(options) {
    console.log(
      `RWK: _configureRenderOptions - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
    );
    super._configureRenderOptions(options);
    // Set initial mode
    let { mode, renderContext } = options;
    if (mode === undefined && renderContext === "createItem") mode = this.constructor.MODES.EDIT;
    this._mode = mode ?? this._mode ?? this.constructor.MODES.PLAY;

    // options.window.title = options.window.title == undefined ? "undefined" : this.document.name;
  }

  /* -------------------------------------------- */
  //#region Unused

  // _createContextMenu(handler) {
  //   console.log(
  //     `RWK: _createContextMenu - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   super._createContextMenu(handler);
  // }

  // _getHeaderControls() {
  //   console.log(
  //     `RWK: _getHeaderControls - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   return super._getHeaderControls();
  // }

  // _getTabsConfig(group) {
  //   console.log(`RWK: _getTabsConfig - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._getTabsConfig(group);
  // }

  // _headerControlButtons() {
  //   console.log(
  //     `RWK: _headerControlButtons - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   return super._headerControlButtons();
  // }

  // _initializeApplicationOptions(options) {
  //   console.log(
  //     `RWK: _initializeApplicationOptions - ${options.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   return super._initializeApplicationOptions(options);
  // }

  // _insertElement(element) {
  //   console.log(`RWK: _insertElement - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._insertElement(element);
  // }

  // _onChangeForm(formConfig, event) {
  //   console.log(`RWK: _onChangeForm - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._onChangeForm(formConfig, event);
  // }

  // _onClickAction(event, target) {
  //   console.log(`RWK: _onClickAction - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._onClickAction(event, target);
  // }

  // _onClickTab(event) {
  //   console.log(`RWK: _onClickTab - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._onClickTab(event);
  // }

  // _onClose(options) {
  //   console.log(`RWK: _onClose - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._onClose(options);
  // }

  // _onDragOver(event) {
  //   console.log(`RWK: _onDragOver - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._onDragOver(event);
  // }

  // async _onDragStart(event) {
  //   console.log(`RWK: _onDragStart - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await await super._onDragStart(event);
  // }

  // async _onDrop(event) {
  //   console.log(`RWK: _onDrop - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await await super._onDrop(event);
  // }

  // async _onDropActiveEffect(event, effect) {
  //   console.log(
  //     `RWK: _onDropActiveEffect - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   await await super._onDropActiveEffect(event, effect);
  // }

  // async _onDropActor(event, actor) {
  //   console.log(`RWK: _onDropActor - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await await super._onDropActor(event, actor);
  // }

  // async _onDropFolder(event, folder) {
  //   console.log(`RWK: _onDropFolder - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await await super._onDropFolder(event, folder);
  // }

  // async _onDropItem(event, item) {
  //   console.log(`RWK: _onDropItem - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await await super._onDropItem(event, item);
  // }

  // async _onFirstRender(context, options) {
  //   console.log(`RWK: _onFirstRender - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await await super._onFirstRender(context, options);
  // }

  // _onPosition(position) {
  //   console.log(`RWK: _onPosition - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._onPosition(position);
  // }

  // async _onRender(context, options) {
  //   console.log(`RWK: _onRender - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await await super._onRender(context, options);
  // }

  // _onRevealSecret(event) {
  //   console.log(
  //     `RWK: _onRevealSecret - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   super._onRevealSecret(event);
  // }

  // async _onSortItem(event, item) {
  //   console.log(`RWK: _onSortItem - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await super._onSortItem(event, item);
  // }

  // async _onSubmitForm(formConfig, event) {
  //   console.log(`RWK: _onSubmitForm - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await super._onSubmitForm(formConfig, event);
  // }

  // async _postRender(context, options) {
  //   console.log(`RWK: _postRender - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await super._postRender(context, options);
  // }

  // async _preClose(options) {
  //   console.log(`RWK: _preClose - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await super._preClose(options);
  // }

  // async _preFirstRender(context, options) {
  //   console.log(
  //     `RWK: _preFirstRender - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   await super._preFirstRender(context, options);
  // }

  //#endregion

  // see -F:\RPG\Foundry\Foundry-Dev\systems\dnd5e\module\applications\actor\api\base-actor-sheet.mjs
  /** @override */
  async _prepareContext(options) {
    console.log(
      `RWK: _prepareContext - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
    );
    const context = {
      ...(await super._prepareContext(options)),
      actor: this.actor,
      editable: this.isEditable && this._mode === this.constructor.MODES.EDIT,
    };
    context.source = context.editable ? this.actor.system._source : this.actor.system;

    return context;
  }

  /* -------------------------------------------- */
  //#region Unused

  // _prepareSubmitData(event, form, formData, updateData) {
  //   console.log(
  //     `RWK: _prepareSubmitData - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   super._prepareSubmitData(event, form, formData, updateData);
  // }

  // _prepareTabs(group) {
  //   console.log(`RWK: _prepareTabs - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._prepareTabs(group);
  // }

  // _prePosition(position) {
  //   console.log(`RWK: _prePosition - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._prePosition(position);
  // }

  // async _preRender(context, options) {
  //   console.log(`RWK: _preRender - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await super._preRender(context, options);
  // }

  // _processFormData(event, form, formData) {
  //   console.log(
  //     `RWK: _processFormData - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   super._processFormData(event, form, formData);
  // }

  // async _processSubmitData(event, form, submitData, options) {
  //   console.log(
  //     `RWK: _processSubmitData - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   await super._processSubmitData(event, form, submitData, options);
  // }

  // _removeElement(element) {
  //   console.log(`RWK: _removeElement - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._removeElement(element);
  // }

  // async _renderFrame(options) {
  //   console.log(`RWK: _renderFrame - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   const html = await super._renderFrame(options);
  //   return html;
  // }

  // _renderHeaderControl(control) {
  //   console.log(
  //     `RWK: _renderHeaderControl - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   super._renderHeaderControl(control);
  // }

  // async _renderHTML(context, options) {
  //   console.log(`RWK: _renderHTML - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   return await super._renderHTML(context, options);
  // }

  // _replaceHTML(result, content, options) {
  //   console.log(`RWK: _replaceHTML - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._replaceHTML(result, content, options);
  // }

  // _tearDown(options) {
  //   console.log(`RWK: _tearDown - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._tearDown(options);
  // }

  // _toggleDisabled(disabled) {
  //   console.log(
  //     `RWK: _toggleDisabled - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   super._toggleDisabled(disabled);
  // }

  // _updateFrame(options) {
  //   console.log(`RWK: _updateFrame - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super._updateFrame(options);
  // }

  // _updatePosition(position) {
  //   console.log(
  //     `RWK: _updatePosition - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   return super._updatePosition(position);
  // }

  // addEventListener(type, listener, options) {
  //   console.log(
  //     `RWK: addEventListener - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   super.addEventListener(type, listener, options);
  // }

  // bringToFront() {
  //   console.log(`RWK: bringToFront - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super.bringToFront();
  // }

  // changeTab(tab, group, options) {
  //   console.log(`RWK: changeTab - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super.changeTab(tab, group, options);
  // }

  // async close(options) {
  //   console.log(`RWK: close - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await super.close(options);
  // }

  // dispatchEvent(event) {
  //   console.log(`RWK: dispatchEvent - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super.dispatchEvent(event);
  // }

  // inheritanceChain() {
  //   console.log(
  //     `RWK: inheritanceChain - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   super.inheritanceChain();
  // }

  // async maximize() {
  //   console.log(`RWK: maximize - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await super.maximize();
  // }

  // async minimize() {
  //   console.log(`RWK: minimize - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await super.minimize();
  // }

  // parseCSSDimension(style, parentDimension) {
  //   console.log(
  //     `RWK: parseCSSDimension - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   super.parseCSSDimension(style, parentDimension);
  // }

  // removeEventListener(type, listener) {
  //   console.log(
  //     `RWK: removeEventListener - ${this.document.documentName} : index ${CONFIG.rwkCount++}`
  //   );
  //   super.removeEventListener(type, listener);
  // }

  // async render(options, _options) {
  //   console.log(`RWK: render - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await super.render(options);
  // }

  // setPosition(position) {
  //   console.log(`RWK: setPosition - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   super.setPosition(position);
  // }

  // async submit(submitOptions) {
  //   console.log(`RWK: submit - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await super.submit(submitOptions);
  // }

  // async toggleControls(expanded, options) {
  //   console.log(`RWK: toggleControls - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await super.toggleControls(expanded, options);
  // }

  // async waitForImages(element) {
  //   console.log(`RWK: waitForImages - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
  //   await super.waitForImages(element);
  // }

  //#endregion
}
