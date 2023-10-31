import { Component, OnInit } from '@angular/core';
import { Observable,Subscription, interval  } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { EP1Service } from 'src/app/services/ep1.service';

@Component({
  selector: 'app-compte-rendus',
  templateUrl: './compte-rendus.component.html',
  styleUrls: ['./compte-rendus.component.css']
})
export class CompteRendusComponent implements OnInit{
  id: any;
  private updateSubscription!: Subscription;
 elas = { "took": 1, "timed_out": false, "_shards": { "total": 1, "successful": 1, "skipped": 0, "failed": 0 }, "hits": { "total": { "value": 1, "relation": "eq" }, "max_score": 0.5753642, "hits": [ { "_index": "searchs", "_type": "search", "_id": "103", "_score": 0.5753642, "_source": { "Niveau": "Warning", "Description": "Liste des serveurs actifs", "TransactionCode": "SM66", "EP1": "SEXTGLXPAP01_EP1_00\r\nSEXTGLXPAP02_EP1_10", "sage": 68, "stext": "updated Record" } } ] } }
  newPost = { "message": "Posts fetched successfully!", "posts": [ { "applicable_chipsets": [], "_id": "5d0c1f6284d47349138591a6", "Delivered": "N/A", "orgRadar": "51918661", "root_build": "", "inserted_by": "username", "milestone": "ms1", "project_tag": "", "inserted_on": "2019-06-20T17:05:54.896Z", "SDK": "" } ] };
  //tasks: EP1[] = [];
  tasks =  {} as any;
  resultTasks: any[] = [];
  gh!: string;

  constructor(private ep1Service: EP1Service, private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.updateSubscription = interval(300).subscribe((val)=>{
      this.id = this.route.snapshot.paramMap.get('id');
      this.getEp1(this.id)});
      this.getEp1(this.id)
   // this.getTasks();
   }

  getEp1(type:any){
    this.ep1Service.findAll(type)
         .subscribe(tasks => {this.resultTasks = this.tasks = tasks})
         console.log(this.tasks)




   }
   searchText: string='';
   onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;
    console.log(this.searchText);


   }
   compteRenduRadioButton: string = 'All';

   onfilterRadioChanged(data: string){
    this.compteRenduRadioButton = data;
    console.log(this.compteRenduRadioButton);


   }


}
