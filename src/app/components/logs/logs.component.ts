
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable,Subscription, interval  } from 'rxjs';
import { BackupsService } from 'src/app/services/backups.service';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  private updateSubscription!: Subscription;
  backups =  {} as any;
  resultbackups: any[] = [];
  logs={} as any;
  resultLogs:any[] = [];
  gh!: string;
  id:any;
  ngOnInit(): void {
    this.updateSubscription = interval(300).subscribe((val)=>{
      this.id = this.route.snapshot.paramMap.get('id');
      this.getBackup();
      this.getLog(this.id);

    });

   // this.getbackups();
   }
   constructor(private backupservice:BackupsService,private route: ActivatedRoute){

   }
   getBackup(){
    this.backupservice.findAll()
         .subscribe(backups => {this.resultbackups = this.backups = backups})
         console.log("------------------backups------------",this.resultbackups);



   }
   getLog(type:any){
    this.backupservice.findLogSid(type)
         .subscribe(logs => {this.resultLogs = this.logs = logs})
   }
   searchText: string='';
   onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;
    console.log(this.searchText);

   }
   // findLogSid(type:any)

}
