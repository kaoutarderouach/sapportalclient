import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable,Subscription, interval  } from 'rxjs';
import { BackupsService } from 'src/app/services/backups.service';
@Component({
  selector: 'app-backups',
  templateUrl: './backups.component.html',
  styleUrls: ['./backups.component.css']
})
export class BackupsComponent implements OnInit{
  private updateSubscription!: Subscription;
  backups =  {} as any;
  resultbackups: any[] = [];
  logs={} as any;
  resultLogs:any[] = [];
  id:any;
  gh!: string;
  ngOnInit(): void {
    this.updateSubscription = interval(300).subscribe((val)=>{
      this.id = this.route.snapshot.paramMap.get('id');
      this.getBackup(this.id);
      this.getLog();


    });

   // this.getbackups();
   }
   constructor(private backupservice:BackupsService, private route: ActivatedRoute){

   }

   getBackup(type:any){
    this.backupservice.find(type)
         .subscribe(backups => {this.resultbackups = this.backups = backups})
       



   }
   getLog(){
    this.backupservice.findLog()
         .subscribe(logs => {this.resultLogs = this.logs = logs})
   }
   searchText: string='';
   onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;


   }

}
