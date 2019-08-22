import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CalcFormService {

  constructor(private http: HttpClient) { }

  add(){}
  substract(){}
  divide(){}
  multiply(){}
}
