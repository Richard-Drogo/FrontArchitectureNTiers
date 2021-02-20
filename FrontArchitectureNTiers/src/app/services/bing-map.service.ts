import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BingMapService {

  // BEGIN: CONSTANTS
  private DOMAIN: string = "http://dev.virtualearth.net/REST/v1/Locations?";
  private KEY: string = "AuNsPI58v2ZCsEPnDmrTsnvqfhHTER4WCIEe2XRPSdJDbzl_2RDWH5J4CrR4TwHI";
  // END: CONSTANTS

  
  constructor(
    public httpApi: HttpClient,
  ) { }

  /**
   * Get coordinates for a place.
   */
  getPlaceCoordinates(country: string, city: string) {
    return this.httpApi.get(this.DOMAIN + "countryRegion=" + country + "&locality=" + city + "&key=" + this.KEY);
  }

  getKEY(): string {
    return this.KEY;
  }
}
