import { CalcFormService } from './../../services/calc-form.service';
import { Component, OnInit } from '@angular/core';
import { NumbersI } from './../../interfaces/numbers.interface';

@Component({
  selector: 'app-calc-form',
  templateUrl: './calc-form.component.html',
  styleUrls: ['./calc-form.component.css']
})
export class CalcFormComponent implements OnInit {

  keys: string[] = [];
  result = '';
  numbersDto: NumbersI[];
  json = '';
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
    this.keys = [];

  }

  calculate() {
    this.sendData(this.keys);
    // Procedimiento
    // 3 - 4 * 5 + 6 / 5 * 8
    // 3 - 20 + 6 / 5 * 8
    // 3 - 20 + 1.2 *8
    // 3- 20 + 9.6
    // 3 -20 + 9.6
  }

  sendData(numbers) {
    let one = ''; let two = ''; let oper = '';
    const dto = new NumbersI();
    // valido si el primer y el ultimo caracter del arreglo NO son numeros
    if (isNaN(numbers[0]) || isNaN(numbers[numbers.length - 1])) {
      return true;
    } else {
      for (let i = 0; i <= numbers.length - 1; i++) {
        //Valido si ya se asigno una operacion
        if (oper !== '') {
          two += numbers[i];
        } else {
          // Guardo la operacion
          if (isNaN(numbers[i])) {
            oper = numbers[i];
          } else {
            one += numbers[i];
          }
        }
      }
      dto.numberOne = one;
      dto.numberTwo = two;
      // Pendiente obtener del response resultado para mostrarlo en pantalla
      const res = this.calculateOperation(dto, oper);
      res.then(function (value) {
        console.log(value);
      });
      this.keys = [];
      this.result = '';
    }
  }

  calculateOperation(dto, oper) {
    switch (oper) {
      case '+':
        return new Promise((resolve, reject) => {
          this.calcFormService.add(dto).subscribe(
            res => resolve(res),
            err => reject(err)
          );
        });
      case '-':
        return new Promise((resolve, reject) => {
          this.calcFormService.substract(dto).subscribe(
            res => resolve(res),
            err => reject(err)
          );
        });
      case '/':
        return new Promise((resolve, reject) => {
          this.calcFormService.divide(dto).subscribe(
            res => resolve(res),
            err => reject(err)
          );
        });
      case '*':
        return new Promise((resolve, reject) => {
          this.calcFormService.multiply(dto).subscribe(
            res => resolve(res),
            err => reject(err)
          );
        });
    }
  }

  reverseChain(chain) {
    return chain.split('').reverse().join('');
  }
}
