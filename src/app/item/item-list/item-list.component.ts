import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  itemList;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(response => {
      this.itemList = response.json();
    }, error => {
      this.itemList = {message : "There is an error while fetching data, please try again later!", error : error, status : 0}
    });
  }

}
