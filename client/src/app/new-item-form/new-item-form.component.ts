import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.css']
})
export class NewItemFormComponent implements OnInit {
  @ViewChild('form') newItemForm : NgForm | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.newItemForm);
    
  }

}
