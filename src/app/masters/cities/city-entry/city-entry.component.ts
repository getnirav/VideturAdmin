import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { City } from 'src/app/models/city';
import { County } from 'src/app/models/county';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CityService } from 'src/app/services/city.service';
import { CountyService } from 'src/app/services/county.service';

@Component({
  selector: 'app-city-entry',
  templateUrl: './city-entry.component.html',
  styleUrls: ['./city-entry.component.css']
})
export class CityEntryComponent implements OnInit {

  @Input() autoId: number = 0;
  submitted = false;

  counties: County[] = [];

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal, private cityService: CityService,
    private countyService: CountyService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    countyMasterId: new FormControl('', [
      Validators.required]),
    cityName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    latitude: new FormControl('', [
      Validators.required]),
    longitude: new FormControl('', [
      Validators.required]),
  });

  ngOnInit() {
    this.countyService.getAll().subscribe(result => {
      if (result.isSuccess) {
        this.counties = result.list;
      }
    });
    //   res => {
    //   // console.log(Countries);
    //   this.counties = res;
    // });

    if (this.autoId != 0) {
      // this.vForm.controls['stateCode'].disable({ onlySelf: true });

      this.cityService.get(this.autoId).subscribe(result => {
        if (result.isSuccess) {
          let city: City = result.model;
          this.vForm.patchValue({
            cityName: city.cityName,
            countyMasterId: city.countyMasterId,
            latitude: city.latitude,
            longitude: city.longitude
          });
        } else {
          this.alertify.error(result.message);
        }
      });
      //   (res) => {
      //   // console.log(res);
      //   let city: City = res;
      //   this.vForm.patchValue({
      //     cityName: city.cityName,
      //     countyMasterId: city.countyMasterId,
      //     latitude: city.latitude,
      //     longitude: city.longitude
      //   });
      // },
      //   (error) => {
      //     console.log(error);
      //     this.alertify.error('Server not responding!');
      //   });
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
      this.cityService.add(this.vForm.value).subscribe(result => {
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
      this.cityService.update(this.autoId, this.vForm.getRawValue()).subscribe(result => {
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
