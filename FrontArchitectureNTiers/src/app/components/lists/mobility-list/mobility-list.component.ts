import { Component, OnInit } from '@angular/core';
import { Mobility } from '../../../interfaces/mobility';
import { MobilityService } from '../../../services/mobility.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';

/**
 * Component displaying all the mobilities in the database and providing actions button to manage them.
 */
@Component({
  selector: 'app-mobility-list',
  templateUrl: './mobility-list.component.html',
  styleUrls: ['./mobility-list.component.css']
})
export class MobilityListComponent implements OnInit {

  // BEGIN: CONSTANTS
  private MESSAGE_DELETE_ERROR = "An error occured during deletion...";
  private MESSAGE_DELETE_SUCCESSFUL = "Deletion successful!";
  // END: CONSTANTS

  mobilities: Array<Mobility> = [];
  
  constructor(
    public mobilityService: MobilityService,
    readonly snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.mobilityService.getAllMobilitiesSub();
    this.mobilityService.allMobilitiesList.subscribe( mobilities => {
      this.mobilities = mobilities;
    });
  }

  /**
   * Function called when the user presses the Edit button on a mobility item.
   * @param mobility Mobility to be editted
   */
  goToEditMobilityPage(mobilityToBeEdited: Mobility){
    this.router.navigate(['/edit-mobility/'], {
      state: {
        mobility: JSON.stringify(mobilityToBeEdited)
      }
    });
  }

  /**
   * Function called when the user presses the Delete button on a mobility item.
   * @param mobilityId Id of the mobility to be deleted
   */
  openDeleteDialog(mobilityId: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteMobility(mobilityId);
      }
    });
  }

  /**
   * Function called when the user presses the Delete button on the DeleteDialog.
   * @param mobilityId Id of the mobility to be deleted
   */
  deleteMobility(mobilityId: number) {
    let result = this.mobilityService.deleteMobility(mobilityId);

    result.then((state) => {
      if(state){
        this.mobilityService.getAllMobilitiesSub(); // Refreshes all the subscribed list of mobilities.
        this.notification(this.MESSAGE_DELETE_SUCCESSFUL, 4000);
      } else {
        this.notification(this.MESSAGE_DELETE_ERROR,  4000);
      }
    });
  }

  /**
   * Display a toast with custom message and duration.
   */ 
  notification(notificationMessage: string, messageDuration: number) {
    return this.snackBar.open(notificationMessage, '',{
      duration: messageDuration,
      panelClass: 'snack-bar'
    });
  }
}
