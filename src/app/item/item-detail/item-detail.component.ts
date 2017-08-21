import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ItemService } from '../item.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  itemDetail:any;
  onShowModal: Boolean;
  onDeleteResponse: Object;
  onPurchaseResponse: Object;

  constructor(private route: ActivatedRoute, private itemService: ItemService, private router: Router) { }

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => {
      return this.itemService.getItem(params['id']); 
    })
    .subscribe(response => {
      this.itemDetail = response.json();
    }, error => {
      this.itemDetail = {message : "There is an error while fetching data, please try again later!", error : error, status : 0}
    });
  }

  onConfirmDelete(){
    this.route.params
    .switchMap((params: Params) => {
      return this.itemService.deleteItem(params['id']); 
    })
    .subscribe(response => {
      this.onDeleteResponse = response.json();
      var self = this;
      window.setTimeout(function(){
        self.router.navigateByUrl('/');    
      }, 1000);
    }, error => {
      this.onDeleteResponse = {message : "There is an error while fetching data, please try again later!", error : error, status : 0}
    });
  }

  onPurchase(){
    this.route.params
    .switchMap((params: Params) => {
      return this.itemService.updateItem(this.itemDetail.data); 
    })
    .subscribe(response => {
      this.onPurchaseResponse = response.json();
    }, error => {
      this.onDeleteResponse = {message : "There is an error while fetching data, please try again later!", error : error, status : 0}
    });
  }

  onDelete(){
    this.onShowModal = true;
  }

  onClose(){
    this.onShowModal = false;
  }
}
