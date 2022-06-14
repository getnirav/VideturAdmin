import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseTypePracticeArea } from 'src/app/models/case-type-practice-area';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CaseTypePracticeAreaService } from 'src/app/services/case-type-practice-area.service';

@Component({
  selector: 'app-case-type-practice-area-entry',
  templateUrl: './case-type-practice-area-entry.component.html',
  styleUrls: ['./case-type-practice-area-entry.component.css']
})
export class CaseTypePracticeAreaEntryComponent implements OnInit {

  @Input() autoId: number = 0;
  submitted = false;

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal, private caseTypePracticeAreaService: CaseTypePracticeAreaService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    practiceArea: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    description: new FormControl(''),
  });
  ngOnInit() {

    if (this.autoId != 0) {
      // this.vForm.controls['countryCode'].disable({ onlySelf: true });

      this.caseTypePracticeAreaService.get(this.autoId).subscribe((result) => {
        if (result.isSuccess) {
          let caseTypePracticeArea: CaseTypePracticeArea = result.model;
          this.vForm.patchValue({
            practiceArea: caseTypePracticeArea.practiceArea,
            description: caseTypePracticeArea.description
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
      this.caseTypePracticeAreaService.add(this.vForm.value).subscribe(result => {
        if (result.isSuccess) {
          this.alertify.success(result.message);
          location.reload();
        } else {
          this.alertify.error(result.message);
        }
      });
    }
    else {
      this.caseTypePracticeAreaService.update(this.autoId, this.vForm.getRawValue()).subscribe(result => {
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
