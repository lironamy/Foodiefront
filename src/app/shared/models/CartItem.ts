import { Food } from "./Food";

export class CartItem {
  name: string = this.food.name;
  quantity: number =1;
  price: number = this.food.price;
  imageUrl: string = this.food.imageUrl;

  constructor( public food: Food) {

  }
}