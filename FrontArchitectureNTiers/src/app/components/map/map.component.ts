import { Component, OnInit } from '@angular/core';
import { NavigationButton } from '../../interfaces/navigation-button';

/**
 * @title Page allowing the user to view the mobilities on a map.
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
