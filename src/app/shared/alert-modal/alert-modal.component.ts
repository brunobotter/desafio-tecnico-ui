import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent  {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ModalAlertData
  ) { }

  getAlertIcon() {
    switch (this.data.alertType) {
      case AlertType.INFO:
        return 'info';
      case AlertType.WARNING:
        return 'warning';
      case AlertType.ERROR:
        return 'error';
    }
  }
}

export class ModalAlertData {
  title: string;
  content: string;
  alertType: AlertType;
  closeButtonLabel: string;

  constructor(data?) {
    if (data) {
      this.title = data.title;
      this.content = data.content;
      this.alertType = data.alertType;
      this.closeButtonLabel = data.closeButtonLabel;
    }
  }
}

export enum AlertType {
  INFO, WARNING, ERROR
}