import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // Centralized space for http requests for items, will be easier to make changes for prod
  baseUrl: string = 'https://localhost:5001/Item/';

  constructor(private http: HttpClient) { }

  getItem(){
    return  this.http.get(this.baseUrl + 'getitems')
  }
  deleteItem(httpOptions: any){
    return this.http.delete(this.baseUrl + 'deleteitem/selected', httpOptions)
  }
  createItem(itemData: any){
    return this.http.post(this.baseUrl + 'additem', itemData)
  }
}
