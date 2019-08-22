import { CalcFormService } from './../../services/calc-form.service';
import { Component, OnInit } from '@angular/core';
import { NumbersI } from 'src/app/interfaces/numbers.interface';

@Component({
  selector: 'app-calc-form',
  templateUrl: './calc-form.component.html',
  styleUrls: ['./calc-form.component.css']
})
export class CalcFormComponent implements OnInit {

  constructor(private calcFormService: CalcFormService) { }

  ngOnInit() {

  }

  myFunction(id) {
    console.log(id);
  }


  add(numbers: NumbersI) {
    this.calcFormService.add(numbers).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

}
