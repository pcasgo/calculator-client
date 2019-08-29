import { CalcFormService } from './../../services/calc-form.service';
import { Component, OnInit } from '@angular/core';
import { NumbersI } from './../../interfaces/numbers.interface';

@Component({
  selector: 'app-calc-form',
  templateUrl: './calc-form.component.html',
  styleUrls: ['./calc-form.component.css']
})
export class CalcFormComponent implements OnInit {

  result = '0';
  numbersDto: NumbersI[];
  constructor(private calcFormService: CalcFormService,
  ) { }

  ngOnInit() {
  }

  async add(one, two) {
    const dto = new NumbersI();
    dto.numberOne = (one !== undefined && one !== '') ? one : '0';
    dto.numberTwo = (two !== undefined && two !== '') ? two : '0';
    const newValue = await this.calcFormService.add(dto);
    this.result = newValue;
    console.log(newValue);
  }

  async substract(one, two) {
    const dto = new NumbersI();
    dto.numberOne = (one !== undefined && one !== '') ? one : '0';
    dto.numberTwo = (two !== undefined && two !== '') ? two : '0';
    const newValue = await this.calcFormService.substract(dto);
    this.result = newValue;
    console.log(newValue);
  }

  async divide(one, two) {
    if (two !== undefined && two !== '') {
      const dto = new NumbersI();
      dto.numberOne = (one !== undefined && one !== '') ? one : '0';
      dto.numberTwo = (two !== undefined && two !== '') ? two : '0';
      const newValue = await this.calcFormService.divide(dto);
      this.result = newValue;
      console.log(newValue);
    } else {
      this.result = '0';
    }
  }

  async multiply(one, two) {
    if (one === '0' || two === '0') {
      this.result = '0';
    } else {
      const dto = new NumbersI();
      dto.numberOne = (one !== undefined && one !== '') ? one : '0';
      dto.numberTwo = (two !== undefined && two !== '') ? two : '0';
      const newValue = await this.calcFormService.multiply(dto);
      this.result = newValue;
      console.log(this.result);
    }
  }
}
