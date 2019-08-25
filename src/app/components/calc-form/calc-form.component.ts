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
    // console.log("CALCULAR: ", this.keys);
    if (this.isNotValid(this.keys)) {
      this.result = 'error de sintaxis';
    } else {
      console.log('operacion valida');
    }
    // Procedimiento
    // 3 - 4 * 5 + 6 / 5 * 8
    // 3 - 20 + 6 / 5 * 8
    // 3 - 20 + 1.2 *8
    // 3- 20 + 9.6
    // 3 -20 + 9.6
  }

  isNotValid(numbers) {
    // valido si el primer y el ultimo caracter del arreglo NO son numeros
    if (isNaN(numbers[0]) || isNaN(numbers[numbers.length - 1])) {
      return true;
    } else {
      //Busco si hay una multplicacion o una division
      const add = numbers.indexOf('+');
      const substract = numbers.indexOf('-');
      const multiply = numbers.indexOf('*');
      const divide = numbers.indexOf('/');
      if (multiply > -1) {
        if (divide > -1) {
          console.log('AQUI');
          // tengo multiplicacion y division
          if (multiply > divide) {
            this.operation(numbers, divide);
          } else {
            this.operation(numbers, multiply);
          }
        }
      } else {
        //no tengo multiplicacion pero valido si hay division
        if (divide > -1) {
          this.operation(numbers, divide);
        } else {
          // solo hay suma y resta
        }
      }
    }

  }

  reverseChain(chain) {
    return chain.split('').reverse().join('');
  }

  add(numbers: NumbersI) {
    this.calcFormService.add(numbers).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  operation(numbers, divide) {
    let dividendo = '';
    let divisor = '';
    let operacion = '';
    let inicio;
    let fin;
    for (let i = divide - 1; i >= 0; i--) {
      // Valido si el primer caracter obtenido es una operacion y si es true es invalida la operacion
      if (isNaN(numbers[i]) && (i === (divide - 1))) {
        break;
      }
      // guardo el valor hacia atras hasta encontrar otra operacion
      if (isNaN(numbers[i])) {
        operacion = numbers[i];
        inicio = i;
        break;
      } else {
        dividendo += numbers[i];
      }
    }
    // invierto el valor obtenido ya que el for es en reversa
    dividendo = this.reverseChain(dividendo);
    // guardo el valor hacia adelante hasta encontrar otra operacion
    for (let i = divide + 1; i <= numbers.length - 1; i++) {
      if (isNaN(numbers[i]) && (i === (divide + 1))) {
        break;
      }
      if (isNaN(numbers[i])) {
        operacion = numbers[i];
        fin = i;
        break;
      } else {
        divisor += numbers[i];
      }
    }
    let arr = '';
    let primeraParte = '';
    let segundaParte = '';
    console.log('test: ', fin + ' ' + inicio);
    for (let i = inicio + 1; i <= fin - 1; i++) {
      arr += numbers[i];
    }
    for (let i = 0; i <= numbers.length - 1; i++) {
      if (i < inicio + 1) {
        primeraParte += numbers[i];
      } else if (i > fin - 1) {
        segundaParte += numbers[i];
      }
    }
    //return this.calcFormService.divide(dto);
  }
}
