import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: ['./cancel-button.component.css']
})
export class CancelButtonComponent implements OnInit {
  @Output() valueCancelled = new EventEmitter<boolean>();
  @Input() showNewform: boolean = false;
  constructor() {}

  ngOnInit(): void {
  }

  onCancel() {
    this.showNewform = !this.showNewform;
    this.valueCancelled.emit(this.showNewform);
    console.log('Cancel');
  }

}
