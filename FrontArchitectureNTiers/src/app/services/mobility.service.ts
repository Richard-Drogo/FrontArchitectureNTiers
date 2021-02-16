import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Mobility } from '../interfaces/mobility';

/**
 * Service to get information about mobilities from the database through the API.
 */
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
    return this.httpApi.get(this.DOMAIN + "mobilities").subscribe(
      (response: any) => {
        this.allMobilitiesList.next(response);
      },
      (error) => {
        console.log(this.ERROR_MESSAGE);
      }
    );
  }


  /**
   * Add a mobility to the database
   * @param studentId The id of the student
   * @param country The name of the destination country
   * @param city The name of the destination city
   * @param beginDate The beginning date of the mobility
   * @param endDate The ending date of the mobility
   * @returns The result of the operation
   */
  createMobility(studentId: number, country: string, city: string, beginDate: string, endDate: string): Promise<boolean>{
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = { headers: headers };

    let mobility = {
      "idUser": studentId,
      "country": country,
      "city": city,
      "beginDate": beginDate,
      "endDate": endDate,
    }

    return new Promise(resolve => {
        this.httpApi.post(this.DOMAIN + "mobilities", mobility, requestOptions)
        .subscribe(data => {
          resolve(true);
        }, error => {
          resolve(false);
          console.log(this.ERROR_MESSAGE);
          //console.log(error); True error to see when we are in debugging mode.
      });
    });

  }
}
