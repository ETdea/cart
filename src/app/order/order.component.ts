import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Order, Unit } from '../service/model/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  data: Order[];
  tempDate = new Date();
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.cardInit();
  }

  cardInit()
  {
    this.orderService.Get().subscribe(result => {
      this.data = result.items;
    }); 
  }

  getPrice(unit: Unit): string
  {
    return `${unit.quantity}${unit.title} x ${unit.price} = ${unit.quantity * unit.price}`;
  }
}
