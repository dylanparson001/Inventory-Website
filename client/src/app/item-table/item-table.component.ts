import { Component, Input, OnInit, Output } from '@angular/core';
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
  isFetching: boolean = false;
  
  @Input() getItems: any;


  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getItems();
  }
}
