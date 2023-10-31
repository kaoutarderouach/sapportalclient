import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Observable,Subscription, interval  } from 'rxjs';
import { BackupsService } from 'src/app/services/backups.service';
import { CompteRendusService } from 'src/app/services/compte-rendus.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private backupservice:BackupsService, private compteRendu:CompteRendusService,private router: Router){

  }
  getBackup(){
   this.compteRendu.findAll()
        .subscribe(tasks => {this.resultTasks = this.tasks = tasks})





  }

  private updateSubscription!: Subscription;
  tasks =  {} as any;
  resultTasks: any = [];
  gh!: string;
  title = 'dashboard';
  chart:any= [];
  nameLabels=["successful","failed","running"];

  ngOnInit(): void {
    this.getBackup()



    Chart.register(...registerables);
    this.resultTasks = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['a', 'b','c', 'd', 'e', 'f','g','h'],
        datasets: [
         { label: 'My First dataset',
          data: [1,3,10,55,65,35,543,543],
          backgroundColor: 'red',
          borderColor: 'red',
          fill: false},
          { label: 'My Second dataset',
          data: [1,3,10,55,65,35,543,543].reverse(),
          backgroundColor: 'blue',
          borderColor: 'blue',
          fill: false},
        ]

      }

    });
  }


  refreshPage(): void {
    this.router.navigate(['./refresh'], { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  getDashboard(){
    Chart.register(...registerables);
    this.chart = new Chart('canva', {
      type: 'doughnut',
      data:{
       labels:this.nameLabels.map(item => item),
      // labels:this.tasks.map(item=>item.hits.hits._source.),
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
      /*data: {
        labels: ['a', 'b','c', 'd', 'e', 'f','g','h'],
        datasets: [
         { label: 'My First dataset',
          data: [1,3,10,55,65,35,543,543],
          backgroundColor: 'red',
          borderColor: 'red',
          fill: false},
          { label: 'My Second dataset',
          data: [1,3,10,55,65,35,543,543].reverse(),
          backgroundColor: 'blue',
          borderColor: 'blue',
          fill: false},
        ]

      }*/
    });
    Chart.register(...registerables);
    this.resultTasks = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['a', 'b','c', 'd', 'e', 'f','g','h'],
        datasets: [
         { label: 'My First dataset',
          data: [1,3,10,55,65,35,543,543],
          backgroundColor: 'red',
          borderColor: 'red',
          fill: false},
          { label: 'My Second dataset',
          data: [1,3,10,55,65,35,543,543].reverse(),
          backgroundColor: 'blue',
          borderColor: 'blue',
          fill: false},
        ]

      }

    });

  }

}
