import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CompteRendusService } from './services/compte-rendus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  ss:string=""
  tasks =  {} as any;
  resultTasks: any[] = [];
  constructor(private compteRendusService:CompteRendusService){}
  getEp1(){
    this.compteRendusService.findAll()
         .subscribe(tasks => {this.resultTasks = this.tasks = tasks})

   }
  ngOnInit(): void {
    this.getEp1()

     this.ss=Array.from('some string')[0];

  }
  title = 'ClientApp';
  startDate: string="";
  endDate: string="";
  logged=0
  message:any

  receiveMessage($event: any){
    this.message=$event
    this.logged=1
    this.sendMessage();

  }
  @Output() event = new EventEmitter<string>()
  sendMessage(){
    this.event.emit(this.message.name)
  }



}
