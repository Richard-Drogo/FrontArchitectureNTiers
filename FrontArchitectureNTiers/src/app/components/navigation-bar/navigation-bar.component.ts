import { Component, OnInit, Input } from '@angular/core';
import { NavigationButton } from '../../interfaces/navigation-button';

/**
 * @title Navigation Bar Component showing menu buttons and coloring the actual menu.
 */
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  // BEGIN: CONSTANTS
  private HOME_ICON: string = "house";
  private MAP_ICON: string = "map";
  private SEARCH_MOBILITY_ICON: string = "manage_search";
  private ADD_MOBILITY_ICON: string = "create";

  private HOME_ROUTE: string = "/home";
  private MAP_ROUTE: string = "/map";
  private SEARCH_MOBILITY_ROUTE: string = "/search-mobility";
  private ADD_MOBILITY_ROUTE: string = "/add-mobility";

  private SELECTED_BUTTON_COLOR: string = "primary";
  // END: CONSTANTS

  @Input()
  actualMenuIndex: number = -1;

  navigationButtons: Array<NavigationButton> = [
    {icon: this.HOME_ICON, route: this.HOME_ROUTE, color: ""},
    {icon: this.MAP_ICON, route: this.MAP_ROUTE, color: ""},
    {icon: this.SEARCH_MOBILITY_ICON, route: this.SEARCH_MOBILITY_ROUTE, color: ""},
    {icon: this.ADD_MOBILITY_ICON, route: this.ADD_MOBILITY_ROUTE, color: ""}
  ];

  constructor() { }

  ngOnInit(): void {
    this.navigationButtons[this.actualMenuIndex].color = this.SELECTED_BUTTON_COLOR;
  }

}
