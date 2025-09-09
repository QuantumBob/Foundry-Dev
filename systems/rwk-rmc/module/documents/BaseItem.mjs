export class BaseItem extends Item {
  get isFree() {
    return this.price < 1;
  }
}