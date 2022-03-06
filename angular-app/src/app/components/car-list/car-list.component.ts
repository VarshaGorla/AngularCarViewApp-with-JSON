import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Car, CarTrackingService, Languages } from '../../services/car-tracking.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, OnDestroy {
carMakeOptions: Array<string> = [];
  driverlang: Array<string> = [];
  loading = true;
  selectedCarMake: string;
  cars: Array<Car> = [];
  genderOptions = ['male', 'female'];
  error: string = '';
  isSelected = false;
  private destroyed$ = new Subject<void>();

  constructor(private carTrackingService: CarTrackingService) { }

  ngOnInit(): void {
    this.getCarMakeOptions();
    this.getLangOptions();
    this.carTrackingService.getCarsList().pipe(takeUntil(this.destroyed$))
      .subscribe((cars: Car[]) => {
        this.cars = cars;
        this.cars.map(car => car.driverLanguage = Languages[car.driverLanguage]);
        this.loading = false;
      },
      (error) => {
        this.error = error.message;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  getCarMakeOptions(): void {
    this.carTrackingService.getCarsList().pipe(takeUntil(this.destroyed$)).subscribe(cars => {
      for (let car of cars) {
        this.carMakeOptions.push(car.carMake);
      }
    });
  }

  getLangOptions(): void {
    let values: Array<string> = [];
    this.carTrackingService.getCarsList().pipe(takeUntil(this.destroyed$)).subscribe(cars => {
      for (let car of cars) {
        if (car.driverLanguage !== undefined) {
          values.push(Languages[car.driverLanguage]);
        }
      }
      let unique = [...new Set(values)];
      this.driverlang = unique;
    });
  }

  getFilteredList(type: string, ev: any): void {
    this.loading = true;
    this.isSelected = true;
    let cars: Observable<Array<Car>>
    switch (type) {
      case 'Make':
        console.log(ev.target.value);
        this.selectedCarMake = ev.target.value;
        cars = this.carTrackingService.getCarMakeFilteredList(ev.target.value);
        break;
      case 'Language':
        cars = this.carTrackingService.getDriverLangFilteredList(ev.target.value);
        break;
      case 'Gender':
        cars = this.carTrackingService.getGenderFilteredList(ev.target.value);
        break;
      default:
        cars = this.carTrackingService.getCarsList()
    }
    cars.pipe(takeUntil(this.destroyed$))
      .subscribe((cars: Array<Car>) => {
        this.cars = cars;
        this.cars.map(car => car.driverLanguage = Languages[car.driverLanguage]);
        this.loading = false;
        this.isSelected = false;
      },
      (error) => {
        this.error = error.message;
        this.loading = false;
        this.isSelected = false;
      });
  }

  onClick(value: Car): void {
    this.carTrackingService.driverName = value.driverName;
  } 



}
