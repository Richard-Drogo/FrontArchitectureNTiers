import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mobility } from 'src/app/interfaces/mobility';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BingMapService } from 'src/app/services/bing-map.service';
import { MobilityService } from 'src/app/services/mobility.service';

/**
 * Component Page allowing the user to edit a mobility.
 * Navigated from Edit Mobility button in the list of mobilities.
 */
@Component({
  selector: 'app-edit-mobility',
  templateUrl: './edit-mobility.component.html',
  styleUrls: ['./edit-mobility.component.css']
})
export class EditMobilityComponent implements OnInit {

  // BEGIN: CONSTANTS
  private MESSAGE_ERROR_INPUTS: string = "There is an error in your inputs!";
  private MESSAGE_NO_CHANGES: string = "You didn't change anything!";
  private MESSAGE_UNABLE_TO_FIND_PLACE: string = "BingMapService was unable to match a place with your inputs!";
  private MESSAGE_UPDATE_SUCCESS: string = "The mobility has been successfuly updated!";
  private MESSAGE_UPDATE_ERROR: string = "Something went wrong server-side...";

  private SEARCH_MOBILITY_ROUTE: string = "/search-mobility";
  // END: CONSTANTS

  mobilityBefore: Mobility = undefined;
  userBefore: User;
  students: Array<User> = [];
  editMobilityFormGroup: FormGroup;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public userService: UserService,
    readonly snackBar: MatSnackBar,
    public BingMapService: BingMapService,
    public mobilityService: MobilityService,
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.mobilityBefore = state.mobility ? JSON.parse(state.mobility) : '';
    }
   }

  ngOnInit(): void {
    if(this.mobilityBefore != undefined){
      this.editMobilityFormGroup = this.formBuilder.group({
        countryControl: ['', Validators.required],
        cityControl: ['', Validators.required],
        beginDateControl: ['', Validators.required],
        endDateControl: ['', Validators.required]
      });
        
      // BEGIN: INITIALISATION OF INPUTS
      this.editMobilityFormGroup.controls.countryControl.setValue(this.mobilityBefore.country);
      this.editMobilityFormGroup.controls.cityControl.setValue(this.mobilityBefore.city);
      this.editMobilityFormGroup.controls.beginDateControl.setValue(this.mobilityBefore.beginDate);
      this.editMobilityFormGroup.controls.endDateControl.setValue(this.mobilityBefore.endDate);
      // END: INITIALISATION OF INPUTS

      this.userService.getAllUsersSub();
      this.userService.allUsersList.subscribe( users => {
        this.students = users;
      });

    } else {
      // If the user tries to go to this page by writing the URL, mobilityBefore will be undefined so we redirect him to the home page.
      this.router.navigate(['home']);
    }
  }

  /**
   * Function called when the user presses the back-arrow-shaped icon.
   * Navigate to Search Mobility Component page.
   */
  goBack() {
    this.router.navigate(['search-mobility']);
  }

  /**
   * Function called when the user presses the "Save Changes" button.
   */
  editMobility() {
    if(this.editMobilityFormGroup.valid){
      if(this.isMobilityChanged()){
        this.notification("OK", 2000);
        let response = this.BingMapService.getPlaceCoordinates(this.editMobilityFormGroup.controls.countryControl.value, this.editMobilityFormGroup.controls.cityControl.value);
        response.subscribe( (place: any) => {
          if(place.resourceSets[0].resources[0] != undefined){
            // BingMap Service managed to find a location for the couple "country, city". So we assume it's okay to update the Database.
            this.updateMobility();
          } else {
            this.notification(this.MESSAGE_UNABLE_TO_FIND_PLACE, 2000);
          }
        });
      } else {
        this.notification(this.MESSAGE_NO_CHANGES, 2000);
      }
    } else {
      this.notification(this.MESSAGE_ERROR_INPUTS, 2000);
    }
  }

  /**
   * Function called by editMobility() if every input is okay.
   */
  updateMobility(){
    let country = this.editMobilityFormGroup.controls.countryControl.value;
    let city = this.editMobilityFormGroup.controls.cityControl.value;

    let beginDateDate : Date = new Date(this.editMobilityFormGroup.controls.beginDateControl.value);
    let beginDate: string = beginDateDate.getFullYear() + "-" + ('0' + (beginDateDate.getMonth()+1)).slice(-2) + "-" + ('0' + beginDateDate.getDate()).slice(-2);
    let endDateDate: Date = new Date(this.editMobilityFormGroup.controls.endDateControl.value);
    let endDate: string = endDateDate.getFullYear() + "-" + ('0' + (endDateDate.getMonth()+1)).slice(-2) + "-" +  ('0' + endDateDate.getDate()).slice(-2);

    let result = this.mobilityService.patchMobility(this.mobilityBefore.id, country, city, beginDate, endDate);

    result.then((response) => {
      if(response){
        this.mobilityService.getAllMobilitiesSub(); // Refresh all the List of mobilities in the project.
        this.notification(this.MESSAGE_UPDATE_SUCCESS, 3000);
      } else {
        this.notification(this.MESSAGE_UPDATE_ERROR, 2000);
      }
      this.router.navigateByUrl(this.SEARCH_MOBILITY_ROUTE);
    });
  }
  
  /**
   * Function returning true if inputs are different from the initial ones.
   */
  isMobilityChanged(): Boolean {
    let countryChanged = !(this.editMobilityFormGroup.controls.countryControl.value === this.mobilityBefore.country);
    let cityChanged = !(this.editMobilityFormGroup.controls.cityControl.value === this.mobilityBefore.city);

    let beginDateDate : Date = new Date(this.editMobilityFormGroup.controls.beginDateControl.value);
    let beginDate: string = beginDateDate.getFullYear() + "-" + ('0' + (beginDateDate.getMonth()+1)).slice(-2) + "-" + ('0' + beginDateDate.getDate()).slice(-2);
    let endDateDate: Date = new Date(this.editMobilityFormGroup.controls.endDateControl.value);
    let endDate: string = endDateDate.getFullYear() + "-" + ('0' + (endDateDate.getMonth()+1)).slice(-2) + "-" +  ('0' + endDateDate.getDate()).slice(-2);
    let beginDateChanged = !(beginDate === this.mobilityBefore.beginDate);
    let endDateChanged = !(endDate === this.mobilityBefore.endDate);

    return (countryChanged || cityChanged || beginDateChanged || endDateChanged);
  }

  /**
   * Display a snackbar with the specified message and duration.
   * @param notificationMessage Message of the snackbar.
   * @param messageDuration Duration of the snackbar.
   */
  notification(notificationMessage: string, messageDuration: number) {
    return this.snackBar.open(notificationMessage, '',{
      duration: messageDuration,
      panelClass: 'snack-bar'
    });
  }
}
