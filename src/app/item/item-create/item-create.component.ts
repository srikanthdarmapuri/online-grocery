import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {
  item : any;
  createMode : Boolean;
  constructor(private route: ActivatedRoute, private itemService: ItemService, private router: Router) {
    this.item = {
      data : {
        title : "",
        notes : ""
      }
    };
  }

  ngOnInit() { 
    this.route.params
    .switchMap((params: Params) => {
      if(params['id'])
        return this.itemService.getItem(params['id']); 
      else  
        this.createMode = true;
    }).subscribe(response => {
      this.item = response.json();
    }, error => {
      if(!this.createMode){
        this.item.message = "There is an error while fetching data, please try again later!";
        this.item.status = 0;
      }
    });
  }

  onCreateItemFormSubmit(itemCreateForm) {
    if (itemCreateForm.valid) {
      if(this.createMode)
        var saveItemResponse = this.itemService.createItem(this.item.data);
      else
        saveItemResponse = this.itemService.updateItem(this.item.data);
      var self = this;
      saveItemResponse.subscribe(response => {
        this.item = response.json();
        if(this.createMode){
          itemCreateForm.reset();
        }
        window.setTimeout(function(){
          self.item.message = "";
          if(!self.createMode && self.item.data._id){
            self.router.navigateByUrl('/items/'+self.item.data._id);          
          }
        }, 2000);
      }, error => {
        this.item.message = "There is an error saving item, please try again later!";
        this.item.status = 0;
        if(this.createMode){
          itemCreateForm.reset();
        }
      })
    }
  }

  onCreateItemFormCancel(form) {
    if(this.createMode)
      this.router.navigateByUrl('/');    
    else
      this.router.navigateByUrl('/items/'+this.item.data._id);    
  }
}
