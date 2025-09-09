import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})

export class OrdersPageComponent implements OnInit {
  
  formattedOrders: FormattedOrder[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(orders => {
      this.formattedOrders = this.formatOrders(orders);
    });
  }

  private formatOrders(orders: Order[]): FormattedOrder[] {
    const formattedOrders: FormattedOrder[] = [];

    for (const order of orders) {
      const formattedOrder: FormattedOrder = {
        date: order.createdAt,
        status: order.status,
        paymentId: order.paymentId,
        items: [],
        totalPrice: order.totalPrice,
      };

      for (const item of order.items) {
        const formattedItem = {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
          totalPrice: item.price * item.quantity,
        };

        formattedOrder.items.push(formattedItem);
      }

      formattedOrders.push(formattedOrder);
    }

    return formattedOrders;
  }
}

interface FormattedOrder {
  date: string;
  status: string;
  paymentId: string;
  items: {
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    totalPrice: number;
  }[];
  totalPrice: number;
}
