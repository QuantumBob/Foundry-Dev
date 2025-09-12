# \_prepareContext

The variable-based rendering of handlebars is handled by \_prepareContext, an asynchronous function that returns a context object with whatever data gets fed into the template. It has a single argument, options, which is the options object passed to the original render call, but this can usually be ignored.

In Application V1 terms, this is functionally equivalent to its getData call, with the only functional change that this is always asynchronous.

_Inside your handlebars template, you'll only have access to the data setup in \_prepareContext, so if you need to include information such as CONFIG.MYSYSTEM you'll want to include a pointer to it in the returned object._

    Note

    The disconnect between the data provided to the template via _prepareContext and the way that DocumentSheetV2 stores data to the document via the name="" field can cause some confusion. It's common practice to store the document's system data in a system key in the context, which means that you can usually do value="{{system.attribute.value}}" and name="system.attribute.value" in an actor/item sheet and stuff works.

    However, under the hood, the {{}} is pulling stuff from the context object that the _prepareContext returns while the name="" is storing things based on the data path in the document itself. This means that there are situations where they won't actually line up, because they're not fundamentally pointing at the same thing at the end of the day, they just happen to often line up.
