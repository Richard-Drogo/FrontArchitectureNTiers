import { Component, OnInit } from '@angular/core';
import { MobilityService } from 'src/app/services/mobility.service';

/**
 * @title Page allowing the user to search a mobility with filters.
 * TODO: Add a message when there isn't any mobility.
 */
@Component({
  selector: 'app-search-mobility',
  templateUrl: './search-mobility.component.html',
  styleUrls: ['./search-mobility.component.css']
})
export class SearchMobilityComponent implements OnInit {

  constructor(
    public mobilityService: MobilityService
  ) { }

  ngOnInit(): void {
  }
}
