import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppearanceType } from 'src/app/models/appearance-type';
import { CaseTypePracticeArea } from 'src/app/models/case-type-practice-area';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AppearanceTypeService } from 'src/app/services/appearance-type.service';
import { CaseTypePracticeAreaService } from 'src/app/services/case-type-practice-area.service';

@Component({
  selector: 'app-appearance-type-entry',
  templateUrl: './appearance-type-entry.component.html',
  styleUrls: ['./appearance-type-entry.component.css']
})
export class AppearanceTypeEntryComponent implements OnInit {

  @Input() autoId: number = 0;
  submitted = false;

  caseTypePracticeAreas: CaseTypePracticeArea[] = [];

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal, private appearanceTypeService: AppearanceTypeService,
    private caseTypePracticeAreaService: CaseTypePracticeAreaService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    caseTypeId: new FormControl('', [
      Validators.required]),
    appearanceType1: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    description: new FormControl(''),
  });

  ngOnInit() {
    this.caseTypePracticeAreaService.getAll().subscribe(result => {
      if (result.isSuccess) {
        this.caseTypePracticeAreas = result.list;
      }
    });
    //   res => {
    //   // console.log(Countries);
    //   this.counties = res;
    // });

    if (this.autoId != 0) {
      // this.vForm.controls['stateCode'].disable({ onlySelf: true });

      this.appearanceTypeService.get(this.autoId).subscribe(result => {

        if (result.isSuccess) {
          let appearanceType: AppearanceType = result.model;
          this.vForm.patchValue({
            appearanceType1: appearanceType.appearanceType1,
            caseTypeId: appearanceType.caseTypeId,
            description: appearanceType.description,
          });
        } else {
          this.alertify.error(result.message);
        }
      });
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
      this.appearanceTypeService.add(this.vForm.value).subscribe(result => {
        if (result.isSuccess) {
          this.alertify.success(result.message);
          location.reload();
        } else {
          this.alertify.error(result.message);
        }
      }
      );
    }
    else {
      this.appearanceTypeService.update(this.autoId, this.vForm.getRawValue()).subscribe(result => {
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
