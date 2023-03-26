import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.css'],
})
export class ItemTableComponent implements OnInit {
  title = 'Inventory';
  items: any;
  newItemButton = 'New Item';
  deleteItemButton = 'Delete Item';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('https://localhost:5001/Item/getitems').subscribe({
      next: (response) => (this.items = response),
      error: (error) => console.log(error),
      complete: () => console.log('Request has completed'),
    });
  }
}
