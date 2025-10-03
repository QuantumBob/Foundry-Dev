export class AbstractDataModel extends foundry.abstract.TypeDataModel {
  static mergeSchema(a, b) {
    Object.assign(a, b);
    return a;
  }

}
