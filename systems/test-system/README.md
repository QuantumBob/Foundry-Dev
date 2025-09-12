# Test System

## Initial setup

### Create system.json

```
{
  "id": "test-system",
  "title": "Test System",
  "description": "An simple system to to see what we need",
  "version": "0.0.1",
  "compatibility": {
    "minimum": 12,
    "verified": 13
  },
  "authors": [
    {
      "name": "rwk"
    }
  ],
  "languages": [
    {
      "lang": "en",
      "name": "English",
      "path": "./lang/en.json"
    }
  ],
  "esmodules": ["./test-system.mjs"],
  "styles": ["./styles/test-system.css"],
  "documentTypes": {
    "Actor": {
      "character": {}
    },
    "Item": {
      "weapon": {}
    }
  }
}
```

### Create test-system.mjs

```
Hooks.on("init", () => {
  // debug status
  CONFIG.debug.hooks = true;
  console.log("test-system: in init");
});
```

### Create base-actor-data-model.mjs

```
const { NumberField, StringField, SchemaField, BooleanField } = foundry.data.fields;

export class BaseActorDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      version: new StringField({
        required: true,
        nullable: true,
        initial: null,
        gmOnly: true,
        hint: "Version of the data model",
        label: "Version",
      }),
    };
  }
}
```

### Create character-actor-data-model.json

```
import { BaseActorDataModel } from "./base-actor-data-model.mjs";

export class CharacterActorDataModel extends BaseActorDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      profession: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      race: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      level: new NumberField({ required: true, integer: true, min: 0, initial: 0, max: 30 }),
      sex: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      age: new NumberField({ required: true, integer: true, min: 15, initial: 15 }),
      appearance: new StringField({ required: false, blank: true, trim: true, initial: "" }),
      hitpoints: new SchemaField({
        min: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        max: new NumberField({ required: true, integer: true, min: 0, initial: 3 }),
        value: new NumberField({ required: true, integer: true, min: 0, initial: 1 }),
      }),
    };
  }
}
```

### Create base-item-data-model.mjs

```
const { NumberField, StringField } = foundry.data.fields;

export class BaseItemDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      rarity: new StringField({
        required: true,
        blank: false,
        options: ["common", "uncommon", "rare", "legendary"],
        initial: "common",
      }),
      price: new NumberField({ required: true, integer: true, min: 0, initial: 20 }),
    };
  }
}
```

### Create weapon-item-data-model.mjs

```
import { BaseItemDataModel } from "./base-item-data-model.mjs";

export class WeaponDataModel extends BaseItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      damage: new NumberField({ required: true, integer: true, positive: true, initial: 5 }),
    };
  }
}
```

### Update test-system.mjs

#### At the top of the file

```
import { CharacterActorDataModel } from "./character-actor-data-model.mjs";
import { WeaponItemDataModel } from "./weapon-item-data-model.mjs";
```

#### Under the console.log

```
  // register data models
  CONFIG.Actor.dataModels = {
    character: CharacterActorDataModel,
  };
  CONFIG.Item.dataModels = {
    weapon: WeaponItemDataModel,
  };
```

### Create the character-actor-sheet.mjs

```
const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

export class CharacterActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["test-system"],
    position: {
      width: 600,
      height: 600,
    },
    form: {
      submitOnChange: true,
    },
  };

  static PARTS = {
    header: {
      template: `systems/rwk-rmc/templates/actor-character-sheet.hbs`,
    },
  };

  get title() {
    return `${game.i18n.localize("TYPES.Actor.character")} Sheet: ${this.document.name}`;
  }
}
```

### Create the weapon-item-sheet.mjs

```
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
    classes: ["test-system"],
    window: {
      icon: "fas fa-suitcase",
      title: "TESTSYS.SheetClass.Item",
      resizable: true,
      minimizable: true,
      contentClasses: ["item-sheetv2-content"],
    },
    position: {
      width: 500,
      height: 600,
    },
  };
  static PARTS = {
    ...super.PARTS,
    navbar: { template: "systems/ars/templates/item/tabs/tab-navigation.hbs" },
    header: { template: "systems/ars/templates/item/parts/item-header-sheetv2.hbs" },
  };
}
```

### Import them into the test-system.mjs

```
import { CharacterActorSheet } from "./character-actor-sheet.mjs";
import { WeaponItemSheet } from "./weapon-item-sheet.mjs";
```

### Register the sheets

```
    const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
    DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.applications.sheets.ActorSheetV2);
    DocumentSheetConfig.registerSheet(Actor, "test-system", CharacterActorSheet, {
        types: ["character"],
        makeDefault: true,
        label: "Test System Character",
    });
```
