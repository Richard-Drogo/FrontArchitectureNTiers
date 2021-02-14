import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { HomeCardComponent } from './components/home/home-card/home-card.component'; 
import { MapComponent } from './components/map/map.component';
import { SearchMobilityComponent } from './components/search-mobility/search-mobility.component';
import { AddMobilityComponent } from './components/add-mobility/add-mobility.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeCardComponent,
    MapComponent,
    SearchMobilityComponent,
    AddMobilityComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
