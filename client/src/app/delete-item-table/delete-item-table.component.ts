import { HttpClient } from '@angular/common/http';
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

  onDelete() {
    let t = this.items
      .filter((opt: { checked: any }) => opt.checked)
      .map((opt: any) => opt);
    this.itemSelected = t;
    let selectedId: number = this.itemSelected[0].id;
    console.log(selectedId);

    this.http
      .delete(`https://localhost:5001/Item/deleteitem/${selectedId}`)
      .subscribe({
        next: (response) => (this.items = response),
        error: (error) => console.log(error),
        complete: () => console.log('Request has completed'),
      });

    this.getItems();
  }

  onCancel() {
    this.formCancelled.emit(true);
    console.log('Cancel');
  }
}
