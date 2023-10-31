import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable,Subscription, interval  } from 'rxjs';
import { JobService } from 'src/app/services/job.service';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit{
  private updateSubscription!: Subscription;
   //tasks: EP1[] = [];
   jobs =  {} as any;
   resultJobs: any[] = [];
   gh!: string;
   id:any;

   constructor(private jobservice: JobService, private route: ActivatedRoute){

   }
   ngOnInit(): void {
     this.updateSubscription = interval(300).subscribe((val)=>{
      this.id = this.route.snapshot.paramMap.get('id');
     this.getJobSid(this.id)
     //this.getJob();
    })

}
getJob(){
  this.jobservice.findAll()
       .subscribe(jobs => {this.resultJobs = this.jobs = jobs})
 }

 getJobSid(type:any){
  this.jobservice.findAllSid(type)
       .subscribe(jobs => {this.resultJobs = this.jobs = jobs})


 }
 searchText: string='';
 onSearchTextEntered(searchValue: string){
  this.searchText = searchValue;
  console.log(this.searchText);

 }
}
