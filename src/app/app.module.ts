import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { ItemCreateComponent } from './item/item-create/item-create.component';

import { ItemService } from './item/item.service';

const routes: Routes = [
  { path: '', component: ItemListComponent },
  { path: 'itemcreate', component: ItemCreateComponent },
  { path: 'itemedit/:id', component: ItemCreateComponent },
  { path: 'items',  component: ItemListComponent },
  { path: 'items/:id', component: ItemDetailComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemDetailComponent,
    ItemCreateComponent
  ],
  imports: [FormsModule, BrowserModule, HttpModule, RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [ItemService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
