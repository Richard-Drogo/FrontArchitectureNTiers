import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HomeCardComponent } from './components/home/home-card/home-card.component'; 
import { MatButtonModule } from '@angular/material/button';
import { MapComponent } from './components/map/map.component';
import { SearchMobilityComponent } from './components/search-mobility/search-mobility.component';
import { ManageMobilityComponent } from './components/manage-mobility/manage-mobility.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeCardComponent,
    MapComponent,
    SearchMobilityComponent,
    ManageMobilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
