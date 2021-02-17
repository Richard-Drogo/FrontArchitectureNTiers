import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MobilityService } from 'src/app/services/mobility.service';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * @title Page allowing the user to add a mobility.
 * TODO1 TODO2 TODO3
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

  private SEARCH_MOBILITY_ROUTE: string = "/search-mobility";
  // END: CONSTANTS

  isEditable = true;

  studentFormGroup: FormGroup;
  students: Array<User> = [];
  studentControl = new FormControl('', Validators.required);
  selectStudentFormControl = new FormControl('', Validators.required);

  placeFormGroup: FormGroup;
  datesRangeGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    public mobilityService: MobilityService,
    readonly snackBar: MatSnackBar,
    private router: Router
    ) { }
    
  ngOnInit(): void {
    this.userService.getAllUsersSub();
    this.userService.allUsersList.subscribe( users => {
      this.students = users;
    });
    this.studentFormGroup = this.formBuilder.group({
      studentControl: [''/*, Validators.required*/] // TODO1: Do the validation // This line is commented because when we put the validator, the stepper can't go to the following step.
    });

    this.placeFormGroup = this.formBuilder.group({ // TODO2: Add a call to bingMap to check if the country and city corresponds to existing coordinates.
      countryControl: ['', Validators.required],
      cityControl: ['', Validators.required]
    });

    this.datesRangeGroup = this.formBuilder.group({
      beginDateControl: new FormControl(), // TODO3: Do the validation.
      endDateControl: new FormControl()
    })

  }

  /**
   * Function executed when the user clicked on the button "Create" at the end of the stepper.
   * Calls the API to create a mobility.
   */
  createMobility() {
    let studentId = this.studentControl.value.id;
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
        this.notification(this.MESSAGE_CREATION_SUCCESS);
      } else {
        this.notification(this.MESSAGE_CREATION_ERROR);
      }
      this.router.navigateByUrl(this.SEARCH_MOBILITY_ROUTE);
    });
  }

    /**
     * Display a toast with the given parameter as a message.
     */ 
    notification(notificationMessage: string) {
      return this.snackBar.open(notificationMessage, '',{
        duration: 1000,
        panelClass: 'snack-bar'
     });
    }
  
}
