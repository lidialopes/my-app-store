import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './products';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  private cartNumberOfItemsSource = new BehaviorSubject(this.items.length);
  currentNumberOfItems = this.cartNumberOfItemsSource.asObservable();
  
  constructor(
    private http: HttpClient
  ) { }

  changeCartNumberOfItems() {
    this.cartNumberOfItemsSource.next(this.items.length);
  }

  addToCart(product: Product) {
    this.items.push(product);
    this.changeCartNumberOfItems();
  }
  
  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }

  getNumberOfItems() {
    return this.items.length;
  }
}