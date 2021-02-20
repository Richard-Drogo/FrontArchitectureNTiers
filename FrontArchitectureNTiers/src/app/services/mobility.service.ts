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
   * Retrieve the mobilities accoding to the specified filters and refresh the values in the list through a subscription service.
   * @param firstname The firstname of the student
   * @param lastname The lastname of the student
   * @param type The class of the student
   * @param country The country of the mobility
   * @param date The date the mobility must contain
   */
  getFilteredMobilitiesSub(firstname: string, lastname: string, type: string, country: string, date: string) {
    // BEGIN: CONSTANTS
    const FIRSTNAME_REQUEST_PARAM = "firstname";
    const LASTNAME_REQUEST_PARAM = "lastname";
    const TYPE_REQUEST_PARAM = "typeUser";
    const COUNTRY_REQUEST_PARAM = "country";
    const DATE_REQUEST_PARAM = "date";
    const PARAMETERS_LABELS = [FIRSTNAME_REQUEST_PARAM, LASTNAME_REQUEST_PARAM, TYPE_REQUEST_PARAM, COUNTRY_REQUEST_PARAM, DATE_REQUEST_PARAM];
    // END CONSTANTS

    let url = this.DOMAIN + "mobilities?";
    let parameters = [firstname, lastname, type, country, date];
    let isFirst = true;
    let i = 0;
    parameters.forEach(parameter => {
      if(parameter.length > 0){
        if(isFirst){
          url = url + PARAMETERS_LABELS[i] + "=" + parameter;
          isFirst = false;
        } else {
          url = url + "&" + PARAMETERS_LABELS[i] + "=" + parameter;
        }
      }
      i = i + 1;
    });
    
    return this.httpApi.get(url).subscribe(
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

  /**
   * Delete the mobility from the databas thanks to the API.
   * @param mobilityId Id of the mobility to be deleted.
   */
  deleteMobility(mobilityId: number): Promise<Boolean>{
    return new Promise(resolve => {
        this.httpApi.delete(this.DOMAIN + "mobilities/" + mobilityId).subscribe((response: any) => {
          resolve(response);
        }, error => {
          resolve(false);
          console.log(this.ERROR_MESSAGE);
          // console.log(error); // Only to be displayed during developpement to prevent malicious users to retrieve more information about the problem.
      });
    });

  }
}
