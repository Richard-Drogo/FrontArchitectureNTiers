import { Component, OnInit } from '@angular/core';
import { NavigationButton } from '../../interfaces/navigation-button';

/**
 * @title Page allowing the user to search a mobility with filters.
 */
@Component({
  selector: 'app-search-mobility',
  templateUrl: './search-mobility.component.html',
  styleUrls: ['./search-mobility.component.css']
})
export class SearchMobilityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
