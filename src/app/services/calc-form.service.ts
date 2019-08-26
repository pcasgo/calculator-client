import { NumbersI } from './../interfaces/numbers.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CalcFormService {

  BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  add(numbers: NumbersI): Observable<number> {
    return this.http.post<any>(`${this.BASE_URL}/add`, numbers);
  }

  substract(numbers: NumbersI): Observable<number> {
    return this.http.post<number>(`${this.BASE_URL}/substract`, numbers);
  }

  divide(numbers: NumbersI): Observable<number>{
    return this.http.post<number>(`${this.BASE_URL}/divide`, numbers);

  }

  multiply(numbers: NumbersI): Observable<number> {
    return this.http.post<number>(`${this.BASE_URL}/multiply`, numbers);

  }
}
