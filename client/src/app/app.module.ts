import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemTableComponent } from './item-table/item-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewItemFormComponent } from './new-item-form/new-item-form.component';
import { FormsModule } from '@angular/forms';
import { DeleteItemTableComponent } from './delete-item-table/delete-item-table.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemTableComponent,
    NewItemFormComponent,
    DeleteItemTableComponent,
    CancelButtonComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
