import { Component, OnInit, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Onyx Solutions';
  @Output() items: any;
  @Output() newItem: boolean = false;
  @Output() deleteItem: boolean = false;
  @Output() showTable: boolean = true;

  constructor(private http: HttpClient) {}

  showNewForm() {
    this.newItem = !this.newItem;
  }

  showDeleteItem(){
    this.deleteItem = !this.deleteItem;
  }

  @Output() getItems() {
    this.http.get('https://localhost:5001/Item/getitems').subscribe({
      next: (response) => (this.items = response),
      error: (error) => console.log(error),
      complete: () => console.log('Request has completed'),
    });
  }

  ngOnInit(): void {
    this.getItems();
  }
}
