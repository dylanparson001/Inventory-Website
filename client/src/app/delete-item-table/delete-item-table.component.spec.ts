import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteItemTableComponent } from './delete-item-table.component';

describe('DeleteItemTableComponent', () => {
  let component: DeleteItemTableComponent;
  let fixture: ComponentFixture<DeleteItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteItemTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
