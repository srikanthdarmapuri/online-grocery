import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

// import 'rxjs/add/operator/toPromise';

@Injectable()
export class ItemService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private itemUrl = 'http://localhost:8080/item';
  private options = new RequestOptions({headers : this.headers});
  constructor(private http: Http) { }

  getItems() {
    return this.http.get(this.itemUrl);
  }

  getItem(id) {
    return this.http.get(this.itemUrl + "/" + id);
  }

  updateItem(item) {
    return this.http.put(this.itemUrl + "/" + item._id, item);
  }

  deleteItem(id) {
    return this.http.delete(this.itemUrl + "/" + id);
  }

  createItem(item) {
    return this.http.post(this.itemUrl, item, this.options);
  }
}