import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.css'],
})
export class NewItemFormComponent implements OnInit {
  defaultCondition: any = '';
  defaultQuantity: number = 1;
  successfullySubmitted: boolean = false;

  @Output() formCancelled = new EventEmitter<boolean>();
  @ViewChild('form') newItemForm: NgForm | undefined;
  @Input() showNewForm: any;
  @Input() newItem: boolean | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onCreateItem(itemData: {
    name: string;
    category: string;
    condition: string;
    description: string;
  }) {
    this.http
      .post('https://localhost:5001/Item/additem', itemData)
      .subscribe(() => {});
  }

  onCancel() {
    this.formCancelled.emit(true);
  }
}
