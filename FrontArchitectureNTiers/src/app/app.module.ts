import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list'; 
import { MatDividerModule } from '@angular/material/divider'; 
import { MatStepperModule } from '@angular/material/stepper'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HomeCardComponent } from './components/pages/home/home-card/home-card.component'; 
import { MapComponent } from './components/pages/map/map.component';
import { SearchMobilityComponent } from './components/pages/search-mobility/search-mobility.component';
import { AddMobilityComponent } from './components/pages/add-mobility/add-mobility.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MobilityListComponent } from './components/lists/mobility-list/mobility-list.component'; 

import { MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory, BingMapAPILoaderConfig, BingMapAPILoader, GoogleMapAPILoader, GoogleMapAPILoaderConfig } from 'angular-maps';
import { BingMapComponent } from './components/bing-map/bing-map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeCardComponent,
    MapComponent,
    SearchMobilityComponent,
    AddMobilityComponent,
    NavigationBarComponent,
    MobilityListComponent,
    BingMapComponent,
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
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
