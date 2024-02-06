import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TranslocoService } from '@ngneat/transloco';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  constructor(private readonly translocoService: TranslocoService){}
  maxDate = new Date().toISOString().split('T')[0]; // set maximum date to today's date
  minDate:any

  ngOnInit(): void {


  }
  selectedDate: any;

  startDate: any;


  endDate: any;
  enteredDateValue: Date = new Date();
  enteredEndDateValue: Date = new Date();

  @Output()
  searchDateChanged: EventEmitter<Date> = new EventEmitter<Date>();
  onSearchDateChanged(){
    this.searchDateChanged.emit(this.enteredDateValue)
  this.printDate}

  @Output()
  searchEndDateChanged: EventEmitter<Date> = new EventEmitter<Date>();
  onSearchEndDateChanged(){
    this.searchEndDateChanged.emit(this.enteredEndDateValue)
  this.printDate}
  printDate() {
    console.log(this.startDate);
    console.log(this.endDate);

  }
  setDate(date:any, e:any) {
    date === "start" ? (this.startDate = e) : (this.endDate = e);

    this.printDate();
  }
  isDateInRange(): boolean {
    return this.selectedDate >= this.startDate && this.selectedDate <= this.endDate;
  }
  getMinEndDate(): string {
    return this.startDate;
  }

}
