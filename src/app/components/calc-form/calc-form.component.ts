import { CalcFormService } from './../../services/calc-form.service';
import { Component, OnInit } from '@angular/core';
import { NumbersI } from 'src/app/interfaces/numbers.interface';
import { element } from 'protractor';

@Component({
  selector: 'app-calc-form',
  templateUrl: './calc-form.component.html',
  styleUrls: ['./calc-form.component.css']
})
export class CalcFormComponent implements OnInit {

  keys: string[] = [];
  result = '';
  constructor(private calcFormService: CalcFormService,
  ) { }

  ngOnInit() {
  }

  keyPressCalculator(keyPrres) {
    if (this.result === '0' && keyPrres !== undefined && keyPrres !== '0') {
      this.result = keyPrres;
    }
    this.result += keyPrres;
    this.keys.push(keyPrres);
    console.log(this.keys);
  }

  clearScreen() {
    this.result = '';
  }

  calculate() {
    console.log("CALCULAR: ", this.keys);
    // IMPLEMENTAR LOGICA;
    // this.keys.forEach(element => {
    //   console.log('element: ',element);
    //   if(element.charAt !== '+'){

    //   }
    // });
  }

  add(numbers: NumbersI) {
    this.calcFormService.add(numbers).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

}
