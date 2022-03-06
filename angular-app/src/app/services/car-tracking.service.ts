import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Car {
  driverName: string,
  driverCityOrigin: string,
  driverLanguage: string,
  driverPhone: string,
  driverInfo: string,
  driverGender: string,
  carMake: string,
  kmDriven: string,
  location: Array<number>;
}

export enum Languages {
  nl = 'Dutch',
  fr = 'French',
  de = 'German',
  en = 'English',
  es = 'Spanish'
}


@Injectable({
  providedIn: 'root'
})
export class CarTrackingService {

  private base_url = environment.API_URL;
  driverName: string;
  constructor(private httpClient: HttpClient) { }

  getCarsList(): Observable<Array<Car>> {
    return this.httpClient.get<Array<Car>>(this.base_url);
  }

  getCarMakeFilteredList(value: string): Observable<Array<Car>> {
    return this.getCarsList().pipe(map(cars => {
      return cars.filter(car => car.carMake === value);
    }));
  }

  getGenderFilteredList(value: string): Observable<Array<Car>> {
    return this.getCarsList().pipe(map(cars => {
      return cars.filter(car => car.driverGender === value);
    }));
  }

  getDriverLangFilteredList(value: string): Observable<Array<Car>> {
    this.getCarsList().subscribe(_ => console.log(value, Languages[value]));
    return this.getCarsList().pipe(map(cars => {
      return cars.filter(car => value === Languages[car.driverLanguage]);
    }));
  }

  getSelectedCar(): Observable<Car> {
    return timer(1, 5000).pipe(switchMap(() => this.httpClient.get<Array<Car>>(this.base_url)))
    .pipe(map(cars => {
      return cars.filter(car => car.driverName === this.getDriverName())[0];
    }));
  }

  getDriverName(): string {
    return this.driverName;
  }

}
