import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Notification } from 'src/app/models/notification';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'

@Component({
  selector: 'app-notification-entry',
  templateUrl: './notification-entry.component.html',
  styleUrls: ['./notification-entry.component.css']
})
export class NotificationEntryComponent implements OnInit {

  @Input() autoId: number = 0;
  submitted = false;
  public Editor = ClassicEditor;

  NotificationTypes: Array<{ code: string, text: string }> = [
    { code: 'E', text: 'Email' },
    { code: 'A', text: 'App' },
    { code: 'EA', text: 'Email and App Both' },
  ];
  Tones: Array<{ code: string, text: string }> = [
    { code: 'ACT', text: 'Actionable' },
    { code: 'IM', text: 'Important' },
    { code: 'IN', text: 'I  nformational' },
  ];
  smtpSsl: Array<{ code: string, text: string }> = [
    { code: 'True', text: 'Yes' },
    { code: 'False', text: 'No' },
  ];
  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal, private notificationService: NotificationService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    eventCode: new FormControl('', [
      Validators.required, Validators.maxLength(10), Validators.minLength(1)]),
    notificationType: new FormControl('', [
      Validators.required,
      Validators.maxLength(3)]),
    tone: new FormControl('', [
      Validators.required,
      Validators.maxLength(5)]),
    appFrequency: new FormControl('', [
      Validators.required]),
    appFrequencyInterval: new FormControl('', [
      Validators.required]),
    appContent: new FormControl('', [
      Validators.required]),
    emailFrequency: new FormControl('', [
      Validators.required]),
    emailFrequencyInterval: new FormControl('', [
      Validators.required]),
    emailSubject: new FormControl('', [
      Validators.required]),
    emailContent: new FormControl('', [
      Validators.required]),
    smtpServer: new FormControl('', [
      Validators.required]),
    smtpPort: new FormControl('', [
      Validators.required]),
    smtpSsl: new FormControl('', [
      Validators.required]),
    smtpFromName: new FormControl('', [
      Validators.required]),
    smtpEmail: new FormControl('', [
      Validators.required]),
    smtpPassword: new FormControl('', [
      Validators.required]),

  });

  ngOnInit() {

    if (this.autoId != 0) {
      this.notificationService.get(this.autoId).subscribe(result => {
        if (result.isSuccess) {
          let notification: Notification = result.model;
          this.vForm.patchValue({
            eventCode: notification.eventCode,
            notificationType: notification.notificationType,
            tone: notification.tone,
            appFrequency: notification.appFrequency,
            appFrequencyInterval: notification.appFrequencyInterval,
            appContent: notification.appContent,
            emailFrequency: notification.emailFrequency,
            emailFrequencyInterval: notification.emailFrequencyInterval,
            emailSubject: notification.emailSubject,
            emailContent: notification.emailContent,
            smtpServer: notification.smtpServer,
            smtpPort: notification.smtpPort,
            smtpSsl: notification.smtpSsl,
            smtpFromName: notification.smtpFromName,
            smtpEmail: notification.smtpEmail,
            smtpPassword: notification.smtpPassword
          });
        } else {
          this.alertify.error(result.message);
        }
      }
      );
    }
  }
  // convenience getter for easy access to form fields
  get f() { return this.vForm.controls; }
  SaveData() {

    this.submitted = true;
    if (this.vForm.invalid) {
      return;
    }
    if (this.autoId == 0) {
      this.notificationService.add(this.vForm.value).subscribe(result => {
        if (result.isSuccess) {
          this.alertify.success(result.message);
          location.reload();
        } else {
          this.alertify.error(result.message);
        }
      });
    }
    else {
      this.notificationService.update(this.autoId, this.vForm.getRawValue()).subscribe(result => {
        if (result.isSuccess) {
          this.alertify.success(result.message);
          location.reload();
        } else {
          this.alertify.error(result.message);
        }
      }
      );
    }
    this.activeModal.close();
  }
}
