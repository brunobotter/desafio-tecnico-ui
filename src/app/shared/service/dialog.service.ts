import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogModalComponent, ModalConfirmData } from '../dialog-modal/dialog-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog) { }

  

  openConfirmModal(message: string, callBackFunction: Function) {
    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '300px',
      data: new ModalConfirmData({
        title: 'Atenção',
        content: message,
        confirmButtonLabel: 'Confirm',
        closeButtonLabel: 'Close'
      })
    });

    dialogRef.afterClosed().subscribe(result => callBackFunction(result));
  }
}
