// ### DnD

class DnDMethods {
  /** @inheritDoc */ //primary-sheet-mixin.mjs PrimaySheet5e
  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    context.tab = context.tabs[partId];

    /**
     * A hook event that fires during preparation of sheet parts.
     * @function dnd5e.prepareSheetContext
     * @memberof hookEvents
     * @param {PrimarySheet5e} sheet  Sheet being rendered.
     * @param {string} partId         The ID of the part being prepared.
     * @param {object} context        Preparation context that should be mutated.
     * @param {object} options        Render options.
     */
    Hooks.callAll("dnd5e.prepareSheetContext", this, partId, context, options);

    return context;
  }
  /** @inheritDoc */ //CharacterActorSheet
  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    switch (partId) {
      case "abilityScores":
        return this._prepareAbilityScoresContext(context, options);
      case "bastion":
        return this._prepareBastionContext(context, options);
      case "biography":
        return this._prepareBiographyContext(context, options);
      case "details":
        return this._prepareDetailsContext(context, options);
      case "effects":
        return this._prepareEffectsContext(context, options);
      case "features":
        return this._prepareFeaturesContext(context, options);
      case "header":
        return this._prepareHeaderContext(context, options);
      case "inventory":
        return this._prepareInventoryContext(context, options);
      case "sidebar":
        return this._prepareSidebarContext(context, options);
      case "specialTraits":
        return this._prepareSpecialTraitsContext(context, options);
      case "spells":
        return this._prepareSpellsContext(context, options);
      case "tabs":
        return this._prepareTabsContext(context, options);
      default:
        return context;
    }
  }
  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /** @inheritDoc */
  _processFormData(event, form, formData) {
    const submitData = super._processFormData(event, form, formData);

    // Remove any flags that are false-ish
    for (const [key, value] of Object.entries(submitData.flags?.dnd5e ?? {})) {
      if (value) continue;
      delete submitData.flags.dnd5e[key];
      if (foundry.utils.hasProperty(this.document._source, `flags.dnd5e.${key}`)) {
        submitData.flags.dnd5e[`-=${key}`] = null;
      }
    }

    // Correctly process data-edit video elements.
    form.querySelectorAll("video[data-edit]").forEach((v) => {
      foundry.utils.setProperty(submitData, v.dataset.edit, v.src);
    });

    // Prevent wildcard textures from being clobbered.
    const proto = submitData.prototypeToken;
    if (proto) {
      const randomImg = proto.randomImg ?? this.actor.prototypeToken.randomImg;
      if (randomImg) delete submitData.prototypeToken;
    }

    return submitData;
  }

  /**
   * Handle editing the portrait.
   * @param {string} target  The target property being edited.
   * @param {string} path    The image or video path.
   * @protected
   */
  async _onEditPortrait(target, path) {
    if (target.startsWith("token.")) await this.token.update({ [target.slice(6)]: path });
    else {
      const submit = new Event("submit", { cancelable: true });
      this.form.dispatchEvent(submit);
    }
  }
  /** @inheritDoc */
  async _onFirstRender(context, options) {
    await super._onFirstRender(context, options);

    // Apply special context menus for items outside inventory elements
    const featuresElement = this.element.querySelector(
      `[data-tab="features"] ${this.options.elements.inventory}`
    );
    if (featuresElement)
      new ContextMenu5e(
        this.element,
        ".pills-lg [data-item-id], .favorites [data-item-id], .facility[data-item-id]",
        [],
        { onOpen: (...args) => featuresElement._onOpenContextMenu(...args), jQuery: false }
      );
    const inventoryElement = this.element.querySelector(
      `[data-tab="inventory"] ${this.options.elements.inventory}`
    );
    if (inventoryElement)
      new ContextMenu5e(this.element, ".containers [data-item-id]", [], {
        onOpen: (...args) => featuresElement._onOpenContextMenu(...args),
        jQuery: false,
      });
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _onUpdate(data, options, userId) {
    super._onUpdate(data, options, userId);

    const isHpUpdate = !!data.system?.attributes?.hp;

    if (userId === game.userId) {
      if (isHpUpdate) await this.updateBloodied(options);
      await this.updateEncumbrance(options);
      this._onUpdateExhaustion(data, options);
    }

    const hp = options.dnd5e?.hp;
    if (isHpUpdate && hp && !options.isRest && !options.isAdvancement) {
      const curr = this.system.attributes.hp;
      const changes = {
        hp: curr.value - hp.value,
        temp: curr.temp - hp.temp,
      };
      changes.total = changes.hp + changes.temp;

      if (Number.isInteger(changes.total) && changes.total !== 0) {
        this._displayTokenEffect(changes);
        if (
          !game.settings.get("dnd5e", "disableConcentration") &&
          userId === game.userId &&
          options.dnd5e?.concentrationCheck !== false &&
          changes.total < 0 &&
          (changes.temp < 0 || curr.value < curr.effectiveMax)
        ) {
          this.challengeConcentration({ dc: this.getConcentrationDC(-changes.total) });
        }

        /**
         * A hook event that fires when an actor is damaged or healed by any means. The actual name
         * of the hook will depend on the change in hit points.
         * @function dnd5e.damageActor
         * @memberof hookEvents
         * @param {Actor5e} actor                                       The actor that had their hit points reduced.
         * @param {{hp: number, temp: number, total: number}} changes   The changes to hit points.
         * @param {object} update                                       The original update delta.
         * @param {string} userId                                       Id of the user that performed the update.
         */
        Hooks.callAll(
          `dnd5e.${changes.total > 0 ? "heal" : "damage"}Actor`,
          this,
          changes,
          data,
          userId
        );
      }
    }
  }

  /** @inheritDoc */ //Base application
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.CONFIG = CONFIG.DND5E;
    context.inputs = { ...foundry.applications.fields, ...dnd5e.applications.fields };
    return context;
  }

  /** @inheritDoc */ // primary sheet
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.owner = this.document.isOwner;
    context.locked = !this.isEditable;
    context.editable = this.isEditable && this._mode === this.constructor.MODES.EDIT;
    context.tabs = this._getTabs();
    return context;
  }

  /** primary tabs
   * Prepare the tab information for the sheet.
   * @returns {Record<string, Partial<ApplicationTab>>}
   * @protected
   */
  _getTabs() {
    return this.constructor.TABS.reduce((tabs, { tab, condition, ...config }) => {
      if (!condition || condition(this.document))
        tabs[tab] = {
          ...config,
          id: tab,
          group: "primary",
          active: this.tabGroups.primary === tab,
          cssClass: this.tabGroups.primary === tab ? "active" : "",
        };
      return tabs;
    }, {});
  }

  /** @inheritDoc */ //BaseAvtorSheet
  async _prepareContext(options) {
    const context = {
      ...(await super._prepareContext(options)),
      actor: this.actor,
      elements: this.options.elements,
      fields: this.actor.system.schema.fields,
      labels: {
        damageAndHealing: { ...CONFIG.DND5E.damageTypes, ...CONFIG.DND5E.healingTypes },
        ...this.actor.labels,
      },
      limited: this.actor.limited,
      modernRules: this.actor.system.source?.rules
        ? this.actor.system.source.rules === "2024"
        : game.settings.get("dnd5e", "rulesVersion") === "modern",
      rollableClass: this.isEditable ? "rollable" : "",
      sidebarCollapsed: !!game.user.getFlag("dnd5e", this._sidebarCollapsedKeyPath),
      system: this.actor.system,
      user: game.user,
      warnings: foundry.utils.deepClone(this.actor._preparationWarnings),
    };
    context.source = context.editable ? this.actor.system._source : this.actor.system;
    context.config = context.CONFIG; // TODO: Temporary patch until all templates have been updated

    // Cache concentration data and prepare items
    this._concentration = this.actor.concentration;
    await this._prepareItems(context);

    return context;
  }

  /** @inheritDoc */ //DnD CharacterActorSheet
  async _prepareContext(options) {
    const context = {
      ...(await super._prepareContext(options)),
      abilityRows: {
        bottom: [],
        top: [],
        optional: Object.keys(CONFIG.DND5E.abilities).length - 6,
      },
      isCharacter: true,
    };
    context.spellbook = this._prepareSpellbook(context);
    return context;
  }
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _onRender(context, options) {
    await super._onRender(context, options);

    if (!this.actor.limited) {
      this._renderAttunement(context, options);
      this._renderSpellbook(context, options);
    }

    // Show death tray at 0 HP
    const renderContext = options.renderContext ?? options.action;
    const renderData = options.renderData ?? options.data;
    const isUpdate = renderContext === "update" || renderContext === "updateActor";
    const hp = foundry.utils.getProperty(renderData ?? {}, "system.attributes.hp.value");
    if (isUpdate && hp === 0) this._toggleDeathTray(true);
  }

  /**
   * Handle editing an image via the file browser.
   * @this {BaseActorSheet}
   * @param {PointerEvent} event  The triggering event.
   * @param {HTMLElement} target  The action target.
   * @returns {Promise<void>}
   */
  static async #onEditImage(event, target) {
    const attr = target.dataset.edit;
    const current = foundry.utils.getProperty(this.document._source, attr);
    const defaultArtwork =
      this.document.constructor.getDefaultArtwork?.(this.document._source) ?? {};
    const defaultImage = foundry.utils.getProperty(defaultArtwork, attr);
    const fp = new CONFIG.ux.FilePicker({
      current,
      type: target.dataset.type,
      redirectToRoot: defaultImage ? [defaultImage] : [],
      callback: (path) => {
        if (target instanceof HTMLImageElement) {
          target.src = path;
        } else {
          const repl = document.createElement("img");
          Object.assign(repl.dataset, target.dataset);

          repl.src = path;
          target.replaceWith(repl);
        }
        this._onEditPortrait(attr, path);
      },
      position: {
        top: this.position.top + 40,
        left: this.position.left + 10,
      },
    });
    await fp.browse();
  }
}
