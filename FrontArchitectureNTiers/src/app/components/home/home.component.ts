import { Component, OnInit } from '@angular/core';
import { NavigationButton } from '../../interfaces/navigation-button';

/**
 * @title Home Page of the website
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // BEGIN: CONSTANTS
  private HOME_ICON: string = "house";
  private MAP_ICON: string = "map";
  private SEARCH_ICON: string = "manage_search";
  private MANAGE_ICON: string = "create";

  private HOME_ROUTE: string = "/home";
  private MAP_ROUTE: string = "/map";
  private SEARCH_ROUTE: string = "/search-mobility";
  private MANAGE_ROUTE: string = "/manage-mobility";

  private SELECTED_BUTTON_COLOR: string = "primary";

  private ERROR_MESSAGE: string = "Something got wrong...";
  // END: CONSTANTS

  navigationButtons: Array<NavigationButton> = [
    {icon: this.HOME_ICON, route: this.HOME_ROUTE, color: this.SELECTED_BUTTON_COLOR},
    {icon: this.MAP_ICON, route: this.MAP_ROUTE, color: ""},
    {icon: this.SEARCH_ICON, route: this.SEARCH_ROUTE, color: ""},
    {icon: this.MANAGE_ICON, route: this.MANAGE_ROUTE, color: ""}
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
