import { NumbersI } from './../interfaces/numbers.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalcFormService {

  BASE_URL = 'https://prueba-nest.herokuapp.com';
  constructor(private http: HttpClient) { }

  async add(numbers: NumbersI): Promise<string> {
    return await this.http.post<string>(`${this.BASE_URL}/add`, numbers).toPromise();
  }

  async substract(numbers: NumbersI): Promise<string> {
    return this.http.post<string>(`${this.BASE_URL}/substract`, numbers).toPromise();
  }

  async divide(numbers: NumbersI): Promise<string> {
    return this.http.post<string>(`${this.BASE_URL}/divide`, numbers).toPromise();

  }

  async multiply(numbers: NumbersI): Promise<string> {
    return await this.http.post<string>(`${this.BASE_URL}/multiply`, numbers).toPromise();
  }
}
