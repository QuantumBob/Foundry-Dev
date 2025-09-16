# ApplicationV2

The application class for foundry extends to ActorSheetV2
ApplicationV2 -> DocumentV2 -> ActorSheetV2 -> MySheet

It is through this we override \_prepareContext.

_prepareContext returns the context which includes the \_editable_ boolean.

# \_prepareContext

The variable-based rendering of handlebars is handled by \_prepareContext, an asynchronous function that returns a context object with whatever data gets fed into the template. It has a single argument, options, which is the options object passed to the original render call, but this can usually be ignored.

In Application V1 terms, this is functionally equivalent to its getData call, with the only functional change that this is always asynchronous.

_Inside your handlebars template, you'll only have access to the data setup in \_prepareContext, so if you need to include information such as CONFIG.MYSYSTEM you'll want to include a pointer to it in the returned object._
```
Note

The disconnect between the data provided to the template via _prepareContext and the way that DocumentSheetV2 stores data to the document via the name="" field can cause some confusion. It's common practice to store the document's system data in a system key in the context, which means that you can usually do value="{{system.attribute.value}}" and name="system.attribute.value" in an actor/item sheet and stuff works.

However, under the hood, the {{}} is pulling stuff from the context object that the _prepareContext returns while the name="" is storing things based on the data path in the document itself. This means that there are situations where they won't actually line up, because they're not fundamentally pointing at the same thing at the end of the day, they just happen to often line up.
```

In \_prepareContext this refers to the sheet ie MySheet above. It has a member actor which has a member 'system' which is the datamodel ie MyDataModel. Within this is another member \_source which should be used in the handlebars of the template when the sheet is editable. Otherwise use this.actor.system directly.

Likewise when editable, use in the handlebars of the template actor.\_source.name, and just actor.name when not editable.

# Actor (https://foundryvtt.com/api/v13/classes/foundry.documents.Actor.html)

There is also a variable called Actor on the global CONFIG that holds info about all actors ie datamodel array, document class type, etc.

A 'Document' class (https://foundryvtt.com/api/v13/classes/foundry.abstract.Document.html) that extends BaseActor class (https://foundryvtt.com/api/v13/classes/foundry.documents.BaseActor.html) that is constructed with ActorData (https://foundryvtt.com/api/v13/interfaces/foundry.documents.types.ActorData.html).

Note that the Document class is abstract and is an extension of the base DataModel (https://foundryvtt.com/api/v13/classes/foundry.abstract.DataModel.html) or to be presice the TypeDataModel (https://foundryvtt.com/api/v13/classes/foundry.abstract.TypeDataModel.html) which defines a Document. Documents are special in that they are persisted to the database and referenced by \_id. _So the hierachy is DataModel -> Document -> BaseActor -> Actor -> MyActor_

## Interface ActorData

```
interface ActorData {
    \_id: null | string;
    \_stats: DocumentStats; (https://foundryvtt.com/api/v13/interfaces/foundry.data.types.DocumentStats.html)
    effects: ActiveEffectData[]; (https://foundryvtt.com/api/v13/interfaces/foundry.documents.types.ActiveEffectData.html)
    flags: DocumentFlags; (https://foundryvtt.com/api/v13/types/foundry.data.types.DocumentFlags.html)
    img?: string;
    items: ItemData[]; (https://foundryvtt.com/api/v13/interfaces/foundry.documents.types.ItemData.html)
    name: string;
    ownership: object;
    prototypeToken: PrototypeTokenData; (https://foundryvtt.com/api/v13/types/foundry.documents.types.PrototypeTokenData.html)
    sort: number;
    system: object;
    type: string;
    }
```

# DEFAULT_OPTIONS

Each one overrides the previous

## ApplicationV2

```
static DEFAULT_OPTIONS = {
    id: "app-{id}",
    classes: [],
    tag: "div",
    window: {
        frame: true,
        positioned: true,
        title: "",
        icon: "",
        controls: [],
        minimizable: true,
        resizable: false,
        contentTag: "section",
        contentClasses: []
    },
    actions: {},
    form: {
        handler: undefined,
        submitOnChange: false,
        closeOnSubmit: false
    },
  position: {
    width: "auto",
    height: "auto"
    }
};
```

## DocumentSheetV2

```
static DEFAULT_OPTIONS = {
    id: "{id}",
    classes: ["sheet"],
    tag: "form", // Document sheets are forms by default
    document: null,
    viewPermission: DOCUMENT_OWNERSHIP_LEVELS.LIMITED,
    editPermission: DOCUMENT_OWNERSHIP_LEVELS.OWNER,
    canCreate: false,
    sheetConfig: true,
    actions: {
        configureSheet: DocumentSheetV2.#onConfigureSheet,
        copyUuid: {handler: DocumentSheetV2.#onCopyUuid, buttons: [0, 2]},
        editImage: DocumentSheetV2.#onEditImage,
        importDocument: DocumentSheetV2.#onImportDocument
    },
    form: {
        handler: this.#onSubmitDocumentForm,
        submitOnChange: false,
        closeOnSubmit: false
    },
    window: {
        controls: [{
        icon: "fa-solid fa-gear",
        label: "SHEETS.ConfigureSheet",
        action: "configureSheet",
        visible: DocumentSheetV2.#canConfigureSheet
        }]
    }
};
```

  ## ActorSheetV2

```
static DEFAULT_OPTIONS = {
    position: {width: 600},
    window: {
    controls: [
    {
        action: "configureToken",
        icon: "fa-regular fa-circle-user",
        label: "DOCUMENT.Token",
        ownership: "OWNER"
    },
    {
        action: "configurePrototypeToken",
        icon: "fa-solid fa-circle-user",
        label: "TOKEN.TitlePrototype",
        ownership: "OWNER"
    },
    {
        action: "showPortraitArtwork",
        icon: "fa-solid fa-image",
        label: "SIDEBAR.CharArt",
        ownership: "OWNER"
    },
    {
        action: "showTokenArtwork",
        icon: "fa-solid fa-image",
        label: "SIDEBAR.TokenArt",
        ownership: "OWNER"
    }
    ]
},
    actions: {
        configurePrototypeToken: ActorSheetV2.#onConfigurePrototypeToken,
        configureToken: ActorSheetV2.#onConfigureToken,
        showPortraitArtwork: ActorSheetV2.#onShowPortraitArtwork,
        showTokenArtwork: ActorSheetV2.#onShowTokenArtwork
    }
};

```

# PARTS

Used to create the templates for the ActorSheetV2 and its children.
Each PART is defined in Interface HandlebarsTemplatePart (https://foundryvtt.com/api/v13/interfaces/foundry.HandlebarsTemplatePart.html)
  
The PARTS object in the HandlebarsApplication class is a Record ie
PARTS: Record<string, HandlebarsTemplatePart> = {}, with the string being the key to each PART
  
example


```
static PARTS = {
    header: {
        template: `${this.DEFAULT_OPTIONS.templatePath}character-header.hbs`,
    },
};

interface HandlebarsTemplatePart {
    classes?: string[];
    forms?: Record<string, ApplicationFormConfiguration>;
    id?: string;
    root?: boolean;
    scrollable?: string[];
    template: string;
    templates?: string[];
}

interface ApplicationFormConfiguration {
    closeOnSubmit: boolean;
    handler: ApplicationFormSubmission;
    submitOnChange: boolean;
}
```
# Data Models

## Paths and inheritance of data model structure

```
F:\RPG\Foundry\Foundry-Dev\foundry\common\abstract\type-data.mjs
F:\RPG\Foundry\Foundry-Dev\systems\dnd5e\module\data\abstract\system-data-model.mjs
F:\RPG\Foundry\Foundry-Dev\systems\dnd5e\module\data\abstract\actor-data-model.mjs
F:\RPG\Foundry\Foundry-Dev\systems\dnd5e\module\data\actor\templates\common.mjs
F:\RPG\Foundry\Foundry-Dev\systems\dnd5e\module\data\actor\templates\creature.mjs
F:\RPG\Foundry\Foundry-Dev\systems\dnd5e\module\data\actor\character.mjs
foundry.abstract.TypeDataModel -> SystemDataModel -> ActorDataModel -> CommonTemplate -> CreatureTemplate -> CharacterData
```

# Handlebars  

## Use of variables in the .hbs files  

{{context}} will just not show up in a handlebar template   
Objects within the context will show up as [object Object]   
{{system}} will only work if you copy this.actor.system to context   

```
context.system = this.actor.system;
```
