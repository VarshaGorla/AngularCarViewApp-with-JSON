import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Car, CarTrackingService, Languages } from 'src/app/services/car-tracking.service';
import { Loader } from '@googlemaps/js-api-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  loading = true;
  error: string;
  driverName: string;
  location: Array<number>;
  car: Car | undefined;
  map: google.maps.Map;
  isSelected = false;
  private destroyed$ = new Subject<void>();

  constructor(
    private carTrackingService: CarTrackingService
  ) { }

  ngOnInit(): void {
    this.driverName = this.carTrackingService.getDriverName();
    this.carTrackingService.getSelectedCar().pipe(takeUntil(this.destroyed$)).subscribe(val => {
      this.car = val;
      this.car.driverLanguage= Languages[this.car.driverLanguage];
      this.location = val.location;
      this.loading = false;
    },
    (error) => {
      this.error = error.message;
      this.loading = false;
    }
    );
  }

  ngAfterViewInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyCVOui9E-NJekLlH3C-qri6K_Krx-4QS58'
    });
    this.carTrackingService.getSelectedCar().pipe(takeUntil(this.destroyed$)).subscribe(val => {
      loader.load().then(() => {
        this.map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: val.location[0], lng: this.location[1] },
          zoom: 6
        }),
        new google.maps.Marker({
          position:  { lat: this.location[0], lng: this.location[1] },
          map: this.map,
          title: 'markers'
      });
      });
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

}
