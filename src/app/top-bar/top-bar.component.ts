import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit, OnDestroy {
  
  numberOfItems: number = 0;
  subscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.subscription = this.cartService.currentNumberOfItems.subscribe(numberOfItems => this.numberOfItems = numberOfItems);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}