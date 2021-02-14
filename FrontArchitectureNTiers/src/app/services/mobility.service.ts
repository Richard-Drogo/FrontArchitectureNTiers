import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Mobility } from '../interfaces/mobility';

@Injectable({
  providedIn: 'root'
})
export class MobilityService {

  // BEGIN: CONSTANTS
  private DOMAIN: string = "http://localhost:8080/";
  private ERROR_MESSAGE: string = "Error during API call!";
  // END: CONSTANTS

  allMobilitiesList = new Subject<Array<Mobility>>();
  
  constructor(
    public httpApi: HttpClient,
  ) { }

    /**
   * Retrieve the mobilities and refresh the values in the list through a subscription service.
   */
  getAllMobilitiesSub() {
    return this.httpApi.get(this.DOMAIN + "/mobilities").subscribe(
      (response: any) => {
        this.allMobilitiesList.next(response);
      },
      (error) => {
        console.log(this.ERROR_MESSAGE);
      }
  );
  }
}
