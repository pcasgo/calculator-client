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
  primeraParteCadena = 0;
  segundaParteCadena = 0;
  cadena = '12+768/7*6*7+5/2/4+8';
  reGex = new RegExp('[+/*-]', 'gim');
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
    this.test(this.result);
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

  test(cadena) {
    console.log('cadena: ', cadena);
    if (cadena.match(this.reGex)) {
      return true;
    } else {
      // let cadena = '12+768/7*6*7+5/2/4+8';
      // tomo todos los valores anteriores a mult o div y todos los posteriores y resuelvo
      let newCadena = '';
      let newValue = '';
      let operation = '';
      for (let i = 0; i <= this.cadena.length - 1; i++) {
        if (this.cadena[i] === '/' || this.cadena[i] === '*') {
          operation = this.cadena[i];
          // Busco la primera operacion que sea de tipo: [/ o *]
          console.log('aqui: ', this.cadena.indexOf(this.cadena[i]));
          const dto = new NumbersI();
          dto.numberOne = this.obtienePrimerNumeroOperacion(this.cadena, this.cadena[i]);
          dto.numberTwo = this.obtieneSegundoNumeroOperacion(this.cadena, this.cadena[i]);
          // tslint:disable-next-line: no-eval
          console.log('eval: ', eval(dto.numberOne + operation + dto.numberTwo));
          // tslint:disable-next-line: no-eval
          newValue = eval(dto.numberOne + operation + dto.numberTwo).toFixed(2);
          // newValue = this.calculateOperation(dto, operation);
          newCadena = this.actualizaCadena(this.primeraParteCadena, this.segundaParteCadena, newValue);
          console.log('newCadena: ', newCadena);
          // Al encontrar la primera / o * detengo el bucle
          break;
        } else {
          // Aqui solo hay sumas y restas
        }
      }
      return this.test(newCadena);
    }
  }

  obtienePrimerNumeroOperacion(cadena, indice) {
    let one = '';
    for (let i = cadena.indexOf(indice) - 1; i >= 0; i--) {
      // Si no es numero corto el recorrido y guardo la primera parte de la operacion
      if (isNaN(cadena[i])) {
        this.primeraParteCadena = i;
        break;
      } else {
        // Si es numero voy guardando como parte de la operacion
        one += cadena[i];
      }
    }
    one = this.reverseChain(one);
    return one;
  }

  obtieneSegundoNumeroOperacion(cadena, indice) {
    let two = '';
    for (let i = cadena.indexOf(indice) + 1; i <= cadena.length - 1; i++) {
      // Guardo numeros siguientes de la operacion
      if (isNaN(cadena[i])) {
        this.segundaParteCadena = i;
        break;
      } else {
        // Si es numero voy guardando como parte de la operacion
        two += cadena[i];
      }
    }
    return two;
  }

  actualizaCadena(indiceInicio, indiceFin, newValue) {
    let leftPart = '';
    let rightPart = '';
    for (let i = 0; i <= indiceInicio; i++) {
      leftPart += this.cadena[i];
    }
    for (let i = indiceFin; i <= this.cadena.length - 1; i++) {
      rightPart += this.cadena[i];
    }
    return leftPart + newValue + rightPart;
  }
}
