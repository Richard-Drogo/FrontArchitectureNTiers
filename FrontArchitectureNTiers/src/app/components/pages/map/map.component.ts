import { Component, OnInit } from '@angular/core';
import { MobilityService } from '../../../services/mobility.service';
import { BingMapService } from '../../../services/bing-map.service';
import { Place } from '../../../interfaces/place';
import { ViewChild } from '@angular/core' 
import { BingMapsLoader } from '../../../services/bing-maps-loader.service';

/**
 * @title Page allowing the user to view the mobilities on a map.
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  mapReady = false;

  // BEGIN: MOBILITY CARD LABELS
  mobilityStudentName: string;
  mobilityPlaceName: string;
  mobilityDates: string;
  // END: MOBILITY CARD LABELS

  // BEGIN: CONSTANTS
  private EMPTY_MOBILITY_CARD_CONTENT: string = "Hover a mobility place in the map to get the information!";
  // END: CONSTANTS

  constructor(
    public mobilityService: MobilityService,
    public bingMapService: BingMapService
  ) { 
    BingMapsLoader.load().then(res => {
      console.log('BingMapsLoader.load.then', res);
      this.mapReady = true;
    });
  }

  selectedMobility(mobility){
    this.mobilityStudentName = mobility.student.firstname + " " + mobility.student.lastname;
    this.mobilityPlaceName = mobility.country + ", " + mobility.city;
    this.mobilityDates = "From " + mobility.beginDate + " to " + mobility.endDate;
  }

  ngOnInit(): void {
    this.mobilityDates = this.EMPTY_MOBILITY_CARD_CONTENT;
  }

}
