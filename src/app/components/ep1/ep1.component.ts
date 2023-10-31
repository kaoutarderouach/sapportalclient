import { Component, OnInit } from '@angular/core';
import { Observable,Subscription, interval  } from 'rxjs';
import { EP1 } from 'src/app/models/ep1';
import { Chart, registerables } from 'chart.js';

import { EP1Service } from 'src/app/services/ep1.service';
@Component({
  selector: 'app-ep1',
  templateUrl: './ep1.component.html',
  styleUrls: ['./ep1.component.css']
})
export class EP1Component implements OnInit{
  title = 'dashboard';
  chart:any= [];
  private updateSubscription!: Subscription;
 elas = { "took": 1, "timed_out": false, "_shards": { "total": 1, "successful": 1, "skipped": 0, "failed": 0 }, "hits": { "total": { "value": 1, "relation": "eq" }, "max_score": 0.5753642, "hits": [ { "_index": "searchs", "_type": "search", "_id": "103", "_score": 0.5753642, "_source": { "Niveau": "Warning", "Description": "Liste des serveurs actifs", "TransactionCode": "SM66", "EP1": "SEXTGLXPAP01_EP1_00\r\nSEXTGLXPAP02_EP1_10", "sage": 68, "stext": "updated Record" } } ] } }
  newPost = { "message": "Posts fetched successfully!", "posts": [ { "applicable_chipsets": [], "_id": "5d0c1f6284d47349138591a6", "Delivered": "N/A", "orgRadar": "51918661", "root_build": "", "inserted_by": "username", "milestone": "ms1", "project_tag": "", "inserted_on": "2019-06-20T17:05:54.896Z", "SDK": "" } ] };
  //tasks: EP1[] = [];
  tasks =  {} as any;
  resultTasks: any[] = [];
  gh!: string;
  count = {}  as any;
  data: any[] = []

  constructor(private ep1Service: EP1Service){

  }
  ngOnInit(): void {
    Chart.register(...registerables);
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data:{
        labels: [
          'Failed',
          'running',
          'successful',

        ],
        datasets: [{
          label: 'Backup',
          data: [1, 10, 9],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'

          ]
        },
      ]
      }

    });

    this.updateSubscription = interval(300).subscribe((val)=>{
      this.getAll();

    });


   }

  getEp1(){
    this.ep1Service.findAll(1)
         .subscribe(tasks => {this.resultTasks = this.tasks = tasks})
         console.log("------------------tasks------------",this.resultTasks);



   }
   getCount(){
    this.ep1Service.countNiveau()
    .subscribe(counts => {this.count = this.count = counts})
    console.log("------------------count-----------",this.count.count);
   }
   getAll(){
    this.ep1Service.find()
    .subscribe(tasks => {this.resultTasks = this.tasks = tasks})




   }

}
