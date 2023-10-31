import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-type',
  templateUrl: './filter-type.component.html',
  styleUrls: ['./filter-type.component.css']
})
export class FilterTypeComponent implements OnInit{
  constructor(){}
  ngOnInit(): void {

  }
  @Input('total') all: number = 0;
  @Input() free: number = 0;
  @Input() premium: number = 0;

  selectedTypeButtonValue: string = 'All';

  @Output()
  filterTypeButtonSelectedChanged: EventEmitter<string> = new EventEmitter<string>();
  onTypeButtonSelectedChanged(){
    this.filterTypeButtonSelectedChanged.emit(this.selectedTypeButtonValue);
    if(this.selectedTypeButtonValue==="log"){
      console.log(this.selectedTypeButtonValue);
    }


  }



}
