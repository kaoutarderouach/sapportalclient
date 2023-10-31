
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {

  }
  @Input('total') all: number = 0;
  @Input() free: number = 0;
  @Input() premium: number = 0;

  selectedRadioButtonValue: string = 'All';

  @Output()
  filterRadioButtonSelectedChanged: EventEmitter<string> = new EventEmitter<string>();
  onRadioButtonSelectedChanged(){
    this.filterRadioButtonSelectedChanged.emit(this.selectedRadioButtonValue);
    //console.log(this.selectedRadioButtonValue);

  }




}
