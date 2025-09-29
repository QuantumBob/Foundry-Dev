export class RolemasterItem extends Item {
  get isFree() {
    return this.price < 1;
  }
  validate(options) {
    console.log("in validate");
    super.validate(options);
  }

}