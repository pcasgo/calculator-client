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
  reGexAddSub = new RegExp('[+-]', 'gim');
  reGexDivMul = new RegExp('[/*]', 'gim');
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
  }

  clearScreen() {
    this.result = '';
    this.keys = [];

  }

  calculate() {
    // this.sendData(this.keys);
    this.result = '3-2*6/9*4+8/2-6*7';
    console.log('cadena inicial: ', this.result);
    while (this.result.match(this.reGexDivMul) !== null) {
      // console.log('ejecutando: ', this.result);
      this.result = this.findDivAndMul(this.result);
    }
    console.log('cadena final div y mul: ', this.result);
    // while (this.result.match(this.reGexAddSub) !== null) {
    //   console.log('sumas y restas: ', this.result);
    //   this.result = this.findAddAndSub(this.result);
    // }
    // console.log('cadena final add y sub: ', this.result);
    this.findAddAndSub(this.result);
  }

  findAddAndSub(cadena) {
    let newCadena = '';
    let newValue = '';
    let operation = '';
    console.log('AQUI !!!!: ', cadena);
    for (let i = 0; i <= cadena.length - 1; i++) {
      if (isNaN(cadena[i]) && cadena[i] === '+' || cadena[i] === '-') {
        operation = cadena[i];
        // // Busco la primera operacion que sea de tipo: [+ o -]
        const dto = new NumbersI();
        dto.numberOne = this.obtienePrimerNumeroOperacion(cadena, cadena[i]);
        dto.numberTwo = this.obtieneSegundoNumeroOperacion(cadena, cadena[i]);
        // // tslint:disable-next-line: no-eval
        console.log('eval: ', dto.numberOne + operation + dto.numberTwo);
        // // tslint:disable-next-line: no-eval
        newValue = eval(dto.numberOne + operation + dto.numberTwo);
        console.log('newValue: ', newValue);
        // // newValue = this.calculateOperation(dto, operation);
        newCadena = this.actualizaCadena(this.primeraParteCadena, this.segundaParteCadena, newValue, cadena);
        this.primeraParteCadena = 0;
        this.segundaParteCadena = 0;
        console.log('newCadena: ', newCadena);
        // Al encontrar la primera + o - detengo el bucle
        break;
      }
    }
    return newCadena;
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

  findDivAndMul(cadena) {
    // tomo todos los valores anteriores a mult o div y todos los posteriores y resuelvo
    let newCadena = '';
    let newValue = '';
    let operation = '';
    for (let i = 0; i <= cadena.length - 1; i++) {
      if (isNaN(cadena[i]) && cadena[i] === '/' || cadena[i] === '*') {
        operation = cadena[i];
        // Busco la primera operacion que sea de tipo: [/ o *]
        const dto = new NumbersI();
        dto.numberOne = this.obtienePrimerNumeroOperacion(cadena, cadena[i]);
        dto.numberTwo = this.obtieneSegundoNumeroOperacion(cadena, cadena[i]);
        // tslint:disable-next-line: no-eval
        //  console.log('eval: ', dto.numberOne + operation + dto.numberTwo);
        // tslint:disable-next-line: no-eval
        newValue = eval(dto.numberOne + operation + dto.numberTwo);
        // console.log('newValue: ', newValue);
        // newValue = this.calculateOperation(dto, operation);
        newCadena = this.actualizaCadena(this.primeraParteCadena, this.segundaParteCadena, newValue, cadena);
        this.primeraParteCadena = 0;
        this.segundaParteCadena = 0;
        // console.log('newCadena: ', newCadena);
        // Al encontrar la primera / o * detengo el bucle
        break;
      }
    }
    return newCadena;
  }

  obtienePrimerNumeroOperacion(cadena, indice) {
    let one = '';
    // if (indice === '-' && cadena.indexOf(indice) === 0) {
    //   for (let i = cadena.indexOf(indice) + 1; i <= cadena.length - 1; i++) {
    //     if (isNaN(cadena[i]) && cadena[i] !== '.' && cadena[i] !== ',') {
    //       this.primeraParteCadena = i;
    //       break;
    //     } else {
    //       // Si es numero voy guardando como parte de la operacion
    //       one += cadena[i];
    //     }
    //   }
    //   one = indice;
    // } else {
    for (let i = cadena.indexOf(indice) - 1; i >= 0; i--) {
      // Si no es numero corto el recorrido y guardo la primera parte de la operacion
      if (isNaN(cadena[i]) && cadena[i] !== '.' && cadena[i] !== ',') {
        this.primeraParteCadena = i;
        break;
      } else {
        // Si es numero voy guardando como parte de la operacion
        one += cadena[i];
      }
    }
    // }
    one = this.reverseChain(one);
    return one;
  }

  obtieneSegundoNumeroOperacion(cadena, indice) {
    let two = '';
    for (let i = cadena.indexOf(indice) + 1; i <= cadena.length - 1; i++) {
      // Guardo numeros siguientes de la operacion
      if (isNaN(cadena[i]) && cadena[i] !== '.' && cadena[i] !== ',') {
        this.segundaParteCadena = i;
        break;
      } else {
        // Si es numero voy guardando como parte de la operacion
        two += cadena[i];
      }
    }
    return two;
  }

  actualizaCadena(indiceInicio, indiceFin, newValue, cadena) {
    let leftPart = '';
    let rightPart = '';
    let newCadena;
    // Aqui verifico si el indice es mayor a 0 significa que hay algo despues de la operacion
    if (indiceInicio > 0) {
      for (let i = 0; i <= indiceInicio; i++) {
        leftPart += cadena[i];
      }
    }
    // Uno las partes de la nueva cadena formada y la retorno
    if (indiceFin > 0) {
      for (let i = indiceFin; i <= cadena.length - 1; i++) {
        rightPart += cadena[i];
      }
    }
    if (leftPart !== undefined && leftPart !== '') {
      newCadena = leftPart + newValue;
      if (rightPart !== undefined && rightPart !== '') {
        newCadena += rightPart;
      }
    } else {
      if (rightPart !== undefined && rightPart !== '') {
        newCadena = newValue + rightPart;
      } else {
        newCadena = newValue;
      }
    }
    return newCadena;
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
}
