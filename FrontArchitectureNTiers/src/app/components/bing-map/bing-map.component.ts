import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BingMapService } from '../../services/bing-map.service';
import { MobilityService } from 'src/app/services/mobility.service';
import { Mobility } from '../../interfaces/mobility';

@Component({
  selector: 'app-bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.css']
})
export class BingMapComponent implements OnInit {

  // BEGIN: CONSTANTS
  private ERROR_MESSAGE: string = "Something got wrong...";
  // END: CONSTANTS

  @Output()
  selectedMobility = new EventEmitter<Mobility>();

  mobilities: Array<Mobility> = [];
  map;

  constructor(
    public mobilityService: MobilityService,
    public bingMapService: BingMapService
  ) { }

  loadMap() {
    this.map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AuNsPI58v2ZCsEPnDmrTsnvqfhHTER4WCIEe2XRPSdJDbzl_2RDWH5J4CrR4TwHI',
        zoom: 1
    });
  }
  
  plotMobilities() {
    this.mobilityService.getAllMobilitiesSub();
    this.mobilityService.allMobilitiesList.subscribe( mobilities => {
      this.mobilities = mobilities;
      this.mobilities.forEach(mobility => {
        let response = this.bingMapService.getPlaceCoordinates(mobility.country, mobility.city);
        response.subscribe( (place: any) => {
          if(place.resourceSets.length > 0){
            console.log(place.resourceSets[0].resources[0].name);
            //console.log(place.resourceSets[0].resources[0].point.coordinates);
            let coordinates = place.resourceSets[0].resources[0].point.coordinates;
            let pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(coordinates[0], coordinates[1]));
            this.map.entities.push(pushpin);
            let context: BingMapComponent = this;
            Microsoft.Maps.Events.addHandler(pushpin, 'mouseover', function() { 
              context.selectedMobility.emit(mobility);
            });
          } else {
            console.log(this.ERROR_MESSAGE); // Une mobilité a été insérée dans la base de donnée sans qu'un contrôle sur ses coordonnées n'ait été fait.
          }
        });
      });
    });
  }

  ngOnInit() {
    if (typeof Microsoft !== 'undefined') {
        console.log('BingMapComponent.ngOnInit');
        this.loadMap();
        this.plotMobilities();
    }
    
}

}
