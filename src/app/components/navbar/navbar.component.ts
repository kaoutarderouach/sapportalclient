
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable,Subscription, interval  } from 'rxjs';
import { EP1 } from 'src/app/models/ep1';
import { CompteRendusService } from 'src/app/services/compte-rendus.service';
import { EP1Service } from 'src/app/services/ep1.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BackupsService } from 'src/app/services/backups.service';
import { JobService } from 'src/app/services/job.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  logo = 'assets/images/logo.svg'
  dash = 'assets/images/check-solid.svg'

  //tasks: EP1[] = [];
  tasks =  {} as any;
  count =  {} as any;
  resultCount: any[] = [];
  backups  = {} as any;
  resultBackups : any[]=[];
  jobs  = {} as any;
  resultJobs : any[]=[];
  resultTasks: any[] = [];
  gh!: string;
  today = new Date();
  id:any;
  array : any[] = [];
  unique: number[] = [];
  message:string=""
  bol:number=1
  cc:any="test"

  constructor(private compteRendu: CompteRendusService, private ep1Service: EP1Service, private backupService:BackupsService, private jobService: JobService,  private readonly translocoService: TranslocoService){

  }
  ngOnInit(): void {

    this.translocoService.translate('navbar.system');
    this.getSidNavbar();

    this.receiveMessage(event)
    this.getCounts()
    this.getSidJob()



    this.getEp1();
    //this.getEp(event);
  }
  getEp1(){
    this.compteRendu.findAll()
         .subscribe(tasks => {this.resultTasks = this.tasks = tasks})


   }
   getCounts(){
    //tasks.aggregations.unique_values.buckets[0].doc_count
    this.compteRendu.findAll()
    .subscribe(count => {this.resultCount = this.count= count})


   }
   getSidNavbar(){
    this.backupService.findSid()
    .subscribe(backups => {this. resultBackups = this.backups  = backups })


   }
   getSidJob(){
    this.jobService.findSid()
    .subscribe(jobs => {this. resultJobs = this.jobs = jobs })


   }

   getEp(type:any){

    this.ep1Service.findAll(type)
    .subscribe(backups => {this.backups = this.tasks = backups})
    console.log("------------------tasks------------",this.backups);
   }
   getBackup(type:any){
    this.backupService.find(type)
    .subscribe(tasks => {this.resultTasks = this.tasks = tasks})
    console.log("------------------tasks------------",this.resultTasks);

   }
   /*************Serch bar */
   enteredSearchValue: string ='';
   @Output()
   searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
   onSearchTextChanged(){
     this.searchTextChanged.emit(this.enteredSearchValue)
   }
   receiveMessage($event: any){
    this.message=$event

  }
  @Input() user:string=''
  @Input() admin:number=0
  @Input() idUser:number=0

}
