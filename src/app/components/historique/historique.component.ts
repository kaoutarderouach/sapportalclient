import { Component, OnInit } from '@angular/core';
import { Observable,Subscription, interval  } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { EP1Service } from 'src/app/services/ep1.service';
import { Chart, registerables } from 'chart.js';
import { BackupsService } from 'src/app/services/backups.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent  implements OnInit{
  id: any;
  private updateSubscription!: Subscription;
  logo = 'assets/images/bg.png'


  tasks =  {} as any;
  resultTasks: any[] = [];
  gh!: string;

  backups =  {} as any;
  resultbackups: any[] = [];
  logs={} as any;
  resultLogs:any[] = [];
  jobs =  {} as any;
  resultJobs: any[] = [];

  constructor(private ep1Service: EP1Service,private backupservice:BackupsService,private jobservice: JobService){

  }
  ngOnInit(): void {
    this.updateSubscription = interval(300).subscribe((val)=>{

      this.getEp1();
      this.getBackup();
      this.getLog();
      this.getJob();


    });
      this.getEp1()

   }

  getEp1(){
    this.ep1Service.find()
         .subscribe(tasks => {this.resultTasks = this.tasks = tasks})

   }

   getBackup(){
    this.backupservice.findAll()
         .subscribe(backups => {this.resultbackups = this.backups = backups})
         console.log("------------------backups------------",this.resultbackups);



   }

   getLog(){
    this.backupservice.findLog()
         .subscribe(logs => {this.resultLogs = this.logs = logs})
   }
   today = new Date();
   searchDate: Date=new Date();
   searchEndDate: Date=new Date();
   onSearchDateEntered(searchValue: Date){
    this.searchDate = searchValue;
    this. isDateLessThanToday(this.searchDate);
    console.log("",this.searchDate);



   }
   supDate:boolean=false
   onSearchEndDateEntered(searchValue: Date){
    this.searchEndDate = searchValue;
    if(this.searchDate>this.searchEndDate){
      this.supDate=true


    }

   }
   getJob(){
    this.jobservice.findAll()
         .subscribe(jobs => {this.resultJobs = this.jobs = jobs})
   }

   compteRenduRadioButton: string = 'All';
   typeRadioButton: string = 'All';

   onfilterRadioChanged(data: string){
    this.compteRenduRadioButton = data;
    console.log(this.compteRenduRadioButton);


   }
   onfilterTypeChanged(data: string){
    this.typeRadioButton = data;


    console.log(this.typeRadioButton);


   }

   scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  searchText: string='';
  onSearchTextEntered(searchValue: string){
   this.searchText = searchValue;
   console.log(this.searchText);

  }

    todayDate: Date = new Date();
    targetDate: Date = new Date('2022-01-01');
    sup:boolean=false

    isDateLessThanToday(date:any){
      console.log(this.todayDate)
      if (date < this.todayDate){

       this.sup=true
      }

    }

    isDateGreaterThanTarget(date: Date): boolean {
      return date  > this.targetDate;
    }


}
