import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart!: Cart;

  constructor(private cartService: CartService) {
    cartService.getCartObservable()
      .subscribe(cart => this.cart = cart);
  }
  
  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, action: 'increment' | 'decrement') {
    if (action === 'increment') {
      this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity + 1);
    } else if (action === 'decrement' && cartItem.quantity > 1) {
      this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity - 1);
    }
  }
}
