import { Component, OnInit } from '@angular/core';
import { MobilityService } from 'src/app/services/mobility.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @title Page allowing the user to search a mobility with filters.
 * TODO: Add a message when there isn't any mobility. 
 */
@Component({
  selector: 'app-search-mobility',
  templateUrl: './search-mobility.component.html',
  styleUrls: ['./search-mobility.component.css']
})
export class SearchMobilityComponent implements OnInit {

  // BEGIN: CONSTANTS
  private MESSAGE_ERRORS_IN_FILTERS = "There are errors in the filters...";
  // END: CONSTANTS

  students: Array<User> = [];
  searchFormGroup: FormGroup;

  constructor(
    public mobilityService: MobilityService,
    public userService: UserService,
    private formBuilder: FormBuilder,
    readonly snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsersSub();

    this.searchFormGroup = this.formBuilder.group({
      studentControl: [''],
      classControl: [''],
      countryControl: [''],
      dateControl: ['']
    });

    this.userService.allUsersList.subscribe( users => {
      this.students = users;
    });
  }

  /**
   * Called by the button in the filter expansion. Checks if all entries are valid and if there aren't empty. If not, calls the API to get the results.
   */
  filterMobilities() {
    let valid = false;
    if(this.searchFormGroup.valid){
      let isStudentDefined = false;
      let isStudentEmpty = true;
      let student = this.searchFormGroup.controls.studentControl.value;
      if(student != undefined){
        isStudentDefined = true;
        isStudentEmpty = (typeof(student) === 'string');
      }

      let isStudentTypeEmpty;
      let type = this.searchFormGroup.controls.classControl.value;
      isStudentTypeEmpty = type.trim().length <= 0;

      let isCountryEmpty;
      let country = this.searchFormGroup.controls.countryControl.value;
      isCountryEmpty = country.trim().length <= 0;

      let isDateDefined = false;
      let isDateEmpty = true;
      let date = this.searchFormGroup.controls.dateControl.value;
      if(date != undefined){
        isDateDefined = true;
        isDateEmpty = (typeof(date) === 'string');
      }

      if((isStudentEmpty) && (isStudentTypeEmpty) && (isCountryEmpty) && (isDateEmpty)){
        this.mobilityService.getAllMobilitiesSub();
      } else {
        let firstname = "";
        let lastname = "";
        if((isStudentDefined) && (!isStudentEmpty)){
          firstname = student.firstname;
          lastname = student.lastname;
        }

        let localdate;
        if((isDateDefined) && (!isDateEmpty)){
          localdate = date.getFullYear() + "-" + ('0' + (date.getMonth()+1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2);   
        } else {
          localdate = "";
        }
        
        this.mobilityService.getFilteredMobilitiesSub(firstname, lastname, type, country, localdate);
      }
    } else {
      this.notification(this.MESSAGE_ERRORS_IN_FILTERS);
    }

  }

  /**
   * Display a toast with the given parameter as a message.
   */ 
  notification(notificationMessage: string) {
    return this.snackBar.open(notificationMessage, '',{
      duration: 1000,
      panelClass: ['mat-toolbar', 'mat-warn'],
    });
  }
}
