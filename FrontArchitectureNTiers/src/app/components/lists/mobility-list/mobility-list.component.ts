import { Component, OnInit } from '@angular/core';
import { Mobility } from '../../../interfaces/mobility';
import { MobilityService } from '../../../services/mobility.service';

@Component({
  selector: 'app-mobility-list',
  templateUrl: './mobility-list.component.html',
  styleUrls: ['./mobility-list.component.css']
})
export class MobilityListComponent implements OnInit {

  mobilities: Array<Mobility> = [];
  
  constructor(
    public mobilityService: MobilityService
  ) { }

  ngOnInit(): void {
    this.mobilityService.getAllMobilitiesSub();
    this.mobilityService.allMobilitiesList.subscribe( mobilities => {
      this.mobilities = mobilities;
    });
  }

}
