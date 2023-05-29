import { Component, OnInit, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemService } from './_services/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Onyx Solutions';
  // Values to be sent to child components
  @Output() items: any;
  @Output() newItem: boolean = false;
  @Output() deleteItem: boolean = false;
  @Output() showTable: boolean = true;

  constructor(private itemService: ItemService, private http: HttpClient) {}

  // Called by on init, gets all items from api
  @Output() getItems() {
    this.itemService.getItem().subscribe({
      next: (response) =>{
        this.items = response;
        console.log(response);
      },
      error: (error) => console.log(error),
      complete: () => console.log('Request has completed')
    });
  }

  ngOnInit(): void {
    this.getItems();
  }
  // Shows delete item table, going to rename this to Edit Table
  showDeleteItem(){
    this.deleteItem = !this.deleteItem;
  }
  showNewForm() {
    this.newItem = !this.newItem;
  }
}
