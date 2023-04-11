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
  @Output() formCancelled = new EventEmitter<boolean>;
  @ViewChild('form') newItemForm: NgForm | undefined;
  @Input() showNewForm: any;
  @Input() newItem: boolean | undefined;

  constructor() {}
  ngOnInit(): void {}
  onSubmit() {
    console.log(this.newItemForm?.value.name);
  }

  onCancel(){
    this.formCancelled.emit(true);
    console.log('Cancel');
    
  }

}
