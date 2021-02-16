import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../interfaces/user';

/**
 * Service to get information about users from the database through the API.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  // BEGIN: CONSTANTS
  private DOMAIN: string = "http://localhost:8080/";
  private ERROR_MESSAGE: string = "Error during API call!";
  // END: CONSTANTS

  allUsersList = new Subject<Array<User>>();
  
  constructor(
    public httpApi: HttpClient,
  ) { }

    /**
   * Retrieve the users and refresh the values in the list through a subscription service.
   */
  getAllUsersSub() {
    return this.httpApi.get(this.DOMAIN + "/users").subscribe(
      (response: any) => {
        this.allUsersList.next(response);
      },
      (error) => {
        console.log(this.ERROR_MESSAGE);
      }
    );
  }
}
