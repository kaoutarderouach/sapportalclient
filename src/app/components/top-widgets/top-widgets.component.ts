import { Component, OnInit } from '@angular/core';
import { CompteRendusService } from 'src/app/services/compte-rendus.service';
import { BackupsService } from 'src/app/services/backups.service';
import { JobService } from 'src/app/services/job.service';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.css']
})
export class TopWidgetsComponent implements OnInit{
  tasks =  {} as any;
  resultTasks: any[] = [];
  backups =  {} as any;
  resultBackups: any[] = [];
  jobs =  {} as any;
  resultJobs: any[] = [];
  private updateSubscriptionDashboard!: Subscription;


  ngOnInit(): void {
    this.updateSubscriptionDashboard = interval(300).subscribe((val)=>{
      this.getEp1()
      this.getBackup()

      this.getJob()

    })

  }
  constructor(private compteRendu:CompteRendusService, private backupService:BackupsService, private jobService:JobService){}
  getEp1(){
    this.compteRendu.findOK()
         .subscribe(tasks => {this.resultTasks = this.tasks = tasks})

   }
   getBackup(){
    this.backupService.findOK()
    .subscribe(backups => {this.resultBackups= this.backups = backups})
   }
   getJob(){
    this.jobService.findOK()
    .subscribe(jobs => {this.resultJobs= this.jobs = jobs})

   }
}
