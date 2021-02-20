import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MobilityService } from 'src/app/services/mobility.service';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BingMapService } from '../../../services/bing-map.service';

/**
 * @title Page allowing the user to add a mobility.
 */
@Component({
  selector: 'app-add-mobility',
  templateUrl: './add-mobility.component.html',
  styleUrls: ['./add-mobility.component.css'],
})
export class AddMobilityComponent implements OnInit {

  // BEGIN: CONSTANTS
  private MESSAGE_CREATION_SUCCESS = "The mobility has been added!";
  private MESSAGE_CREATION_ERROR = "Something went wrong...";
  private MESSAGE_PLACE_NOT_FOUND = "BingMapService didn't find the place you wrote!";
  private SEARCH_MOBILITY_ROUTE: string = "/search-mobility";
  // END: CONSTANTS

  isEditable = true;

  students: Array<User> = [];

  studentFormGroup: FormGroup;
  placeFormGroup: FormGroup;
  datesRangeGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    public mobilityService: MobilityService,
    readonly snackBar: MatSnackBar,
    private router: Router,
    public bingMapService: BingMapService
    ) { }
    
  ngOnInit(): void {
    this.userService.getAllUsersSub();
    this.userService.allUsersList.subscribe( users => {
      this.students = users;
    });
    this.studentFormGroup = this.formBuilder.group({
      studentControl: ['', Validators.required]
    });

    this.placeFormGroup = this.formBuilder.group({
      countryControl: ['', Validators.required],
      cityControl: ['', Validators.required]
    });

    this.datesRangeGroup = this.formBuilder.group({
      beginDateControl: ['', Validators.required],
      endDateControl: ['', Validators.required],
    })

  }

  /**
   * Checks only for country and city if BingMapService returns coordinates and if so tries to go on the next step.
   * @param stepper 
   */
  nextStepperPlace(stepper: MatStepper) {
    if(this.placeFormGroup.valid){
      let response = this.bingMapService.getPlaceCoordinates(this.placeFormGroup.controls.countryControl.value, this.placeFormGroup.controls.cityControl.value);
      response.subscribe( (place: any) => {
        if(place.resourceSets[0].resources[0] != undefined){
          // BingMap Service managed to find a location for the couple "country, city". So we assume it's okay to continue.
          stepper.next();
        } else {
          this.notification(this.MESSAGE_PLACE_NOT_FOUND, 2000);
        }
      });
    }
 }

  /**
   * Function executed when the user clicked on the button "Create" at the end of the stepper.
   * Calls the API to create a mobility.
   */
  createMobility() {
    let studentId = this.studentFormGroup.controls.studentControl.value.id;
    let country = this.placeFormGroup.controls.countryControl.value;
    let city = this.placeFormGroup.controls.cityControl.value;
    let beginDate = this.datesRangeGroup.controls.beginDateControl.value;
    beginDate = beginDate.getFullYear() + "-" + ('0' + (beginDate.getMonth()+1)).slice(-2) + "-" + ('0' + beginDate.getDate()).slice(-2);
    let endDate = this.datesRangeGroup.controls.endDateControl.value;
    endDate = endDate.getFullYear() + "-" + ('0' + (endDate.getMonth()+1)).slice(-2) + "-" +  ('0' + endDate.getDate()).slice(-2);

    let result = this.mobilityService.createMobility(studentId, country, city, beginDate, endDate);

    result.then((response) => {
      if(response){
        this.mobilityService.getAllMobilitiesSub(); // Refresh all the List of mobilities in the project.
        this.notification(this.MESSAGE_CREATION_SUCCESS, 2000);
      } else {
        this.notification(this.MESSAGE_CREATION_ERROR, 2000);
      }
      this.router.navigateByUrl(this.SEARCH_MOBILITY_ROUTE);
    });
  }

  /**
   * Display a snackbar with the specified message.
   * @param notificationMessage Message of the snackbar.
   * @param messageDuration Duration of the message in ms.
   */
  notification(notificationMessage: string, messageDuration: number) {
    return this.snackBar.open(notificationMessage, '',{
      duration: messageDuration,
      panelClass: 'snack-bar'
    });
  }
  
}
