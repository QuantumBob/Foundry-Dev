export class RMCItem extends Item {
  get isFree() {
    return this.price < 1;
  }
}