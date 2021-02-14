import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AddMobilityComponent } from './components/add-mobility/add-mobility.component';
import { MapComponent } from './components/map/map.component';
import { SearchMobilityComponent } from './components/search-mobility/search-mobility.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'search-mobility', component: SearchMobilityComponent },
  { path: 'add-mobility', component: AddMobilityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
