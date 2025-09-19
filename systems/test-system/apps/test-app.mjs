const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class TestApp extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    classes: ["test-system"],
    position: {
      width: 60,
      height: 120,
    },
    form: {
      submitOnChange: false,
    },
    actions: {
      closeWindow: TestApp.closeWindow,
    },
    window: {
      frame: true,
      //   controls: [
      //     {
      //       // font awesome icon
      //       icon: "fa-solid fa-dice",
      //       // string that will be run through localization
      //       label: "TESTSYS.MENU.CLose",
      //       // string that MUST match one of your `actions`
      //       action: "closeWindow",
      //     },
      //   ],
    },
    templatePath: "systems/test-system/templates",
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

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  async _onFirstRender(context, options) {
    // console.log(`RWK: _onFirstRender - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
    // await super._onFirstRender(context, options);
    // let mainContent = this.element.querySelector(".main-content");
    // if (!mainContent && this.element.querySelector(".tab-body")) {
    //   mainContent = document.createElement("div");
    //   mainContent.classList.add("main-content");
    //   mainContent.dataset.containerId = "main";
    //   this.element.querySelector(".tab-body").after(mainContent);
    // }
    // if (mainContent) {
    //   // Move .main-content into .sheet-body
    //   const sheetBody = document.createElement("div");
    //   sheetBody.classList.add("sheet-body");
    //   mainContent.after(sheetBody);
    //   sheetBody.replaceChildren(mainContent);
    //   // Move .tab-body into .main-content
    //   const tabBody = this.element.querySelector(".tab-body");
    //   if (tabBody) mainContent.append(tabBody);
    // }
  }

  async _renderHTML(context, options) {
    // console.log(`RWK: _renderHTML - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
    return await super._renderHTML(context, options);
  }

  setPosition(position) {
    // console.log(`RWK: setPosition - ${this.document.documentName} : index ${CONFIG.rwkCount++}`);
    position.top = 20;
    super.setPosition(position);
  }
}
