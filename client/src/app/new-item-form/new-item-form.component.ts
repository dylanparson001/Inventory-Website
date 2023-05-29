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
import { ItemService } from '../_services/item.service';

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

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {}

  onCreateItem(itemData: {
    name: string;
    category: string;
    condition: string;
    description: string;
  }) {
    this.itemService.createItem(itemData)
      .subscribe(() => {});
      this.newItemForm?.resetForm();
  }


  onCancel() {
    this.formCancelled.emit(true);
  }
}
