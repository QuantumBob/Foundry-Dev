export class RolemasterItem extends Item {
  get isFree() {
    return this.price < 1;
  }

}