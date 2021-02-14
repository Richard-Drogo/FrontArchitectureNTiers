import { Component, OnInit } from '@angular/core';

/**
 * @title Static Card displaying static information in the home page.
 */
@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  // BEGIN: CONSTANTS
  public CARD_TITLE: string = "News";
  public CARD_SUBTITLE: string = "COVID-19";
  public CARD_CONTENT: string = "According to the latest COVID-19 newsletter, mobilities outside Europe are forbidden. Always check your mails to stay tuned. Do not hesitate to contact the international relations service for any inquiry.";
  // END: CONSTANTS

  constructor() { }

  ngOnInit(): void {
  }

}
