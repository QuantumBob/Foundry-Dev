import hbs from "hbs";

hbs.registerHelper(
  "attrIf", // DO NOT PUT if OR IT WILL BREAK THE REGULAR #if
  (cond, attrName, trueVal, falseVal) => {
    console.log(falseVal);
    const val = cond ? trueVal : falseVal;
    if (val === undefined || val === null) {
      return;
    } else if (attrName === null) {
      return val;
    } else {
      return new hbs.handlebars.SafeString(`${attrName}="${val}"`); // SafeString is required so the " and = are not transformed
    }
  }
);
