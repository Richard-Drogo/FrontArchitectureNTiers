import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { AddMobilityComponent } from './components/pages/add-mobility/add-mobility.component';
import { MapComponent } from './components/pages/map/map.component';
import { SearchMobilityComponent } from './components/pages/search-mobility/search-mobility.component';
import { EditMobilityComponent } from './components/pages/edit-mobility/edit-mobility.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'search-mobility', component: SearchMobilityComponent },
  { path: 'add-mobility', component: AddMobilityComponent },
  { path: 'edit-mobility', component: EditMobilityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
