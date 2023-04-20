import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-delete-item-table',
  templateUrl: './delete-item-table.component.html',
  styleUrls: ['./delete-item-table.component.css'],
})
export class DeleteItemTableComponent implements OnInit {
  saveValue!: string;
  items: any = [];
  itemSelected: any = [];
  @Input() getItems: any;
  @Output() formCancelled = new EventEmitter<boolean>();
  @Input() showNewForm: any;
  @Input() newItem: boolean | undefined;

  @ViewChild('itemCheckbox') itemCheckbox: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getItems();
  }

  CheckAllOptions() {
    if (this.items.every((val: { selected: boolean }) => val.selected == true))
      this.items.forEach((val: { selected: boolean }) => {
        val.selected = false;
      });
    else
      this.items.forEach((val: { selected: boolean }) => {
        val.selected = true;
      });
  }

  deleteSelected() {
    const selectedIds = this.items
      .filter((item: { selected: any }) => item.selected)
      .map((item: { id: any }) => item.id);

    console.log(selectedIds);

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: selectedIds,
    };

    this.http
      .delete('https://localhost:5001/Item/deleteitem/selected', httpOptions)
      .subscribe(() => {
        this.getItems();
      });
  }

  // Keeping here just to look at different method of deletion, but above implemntation covers this entirely
  // onDelete() {
  //   this.itemSelected = this.items
  //     .filter((opt: { checked: any }) => opt.checked)
  //     .map((opt: any) => opt); // puts items that were checked in form to an array

  //   let selectedId: number = this.itemSelected[0].id; // Only picking the ""first"" one, API does not have functionality to delete multiple items at once.

  //   console.log(selectedId);

  //   this.http
  //     .delete(`https://localhost:5001/Item/deleteitem/${selectedId}`)
  //     .subscribe({
  //       next: (response) => (this.items = response),
  //       error: (error) => console.log(error),
  //       complete: () => console.log('Request has completed'),
  //     });

  //   this.getItems();
  // }

  onCancel() {
    this.formCancelled.emit(true);
    console.log('Cancel');
  }
}
