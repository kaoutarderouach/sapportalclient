import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
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

  public chart: any;
   data: any;
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
  //chart:any= [];
  nameLabels=["successful","failed","running"];

  ngOnInit(): void {
    //this.getBackup()
    this.loadData()


  }
  loadData() {
    this.compteRendu.findDashboardForMonth().subscribe((response) => {
      console.log('Données Elasticsearch:', response);
      this.data = this.processData(response);

    //  this.createChart(this.data);
      this.createChartTest()

    });
  }
  processData(response: any) {
    const labels: any[] = [];
    const docCounts: any[] = [];
    const criticalCounts: any[] = [];
    const warningCounts: any[] = [];
    const okCounts: any[] = [];

    response.aggregations.daily_values.buckets.forEach((day: any) => {
      labels.push(day.key_as_string);
     // docCounts.push(day.unique_values.buckets.key);

     const uniqueValuesBucket = day.unique_values.buckets;

     // Recherchez les valeurs "Critical", "Warning" et "OK" dans le seau unique_values
     const criticalValue = uniqueValuesBucket.find((item: any) => item.key === 'Critical');
     const warningValue = uniqueValuesBucket.find((item: any) => item.key === 'Warning');
     const okValue = uniqueValuesBucket.find((item: any) => item.key === 'OK');

     // Ajoutez les doc_count correspondants aux tableaux respectifs
     criticalCounts.push(criticalValue ? criticalValue.doc_count : 0);
     warningCounts.push(warningValue ? warningValue.doc_count : 0);
     okCounts.push(okValue ? okValue.doc_count : 0);
   });


  this.data = {
    labels: labels,
    docCounts: docCounts,
    warningCounts: warningCounts,
    okCounts: okCounts,
    criticalCounts: criticalCounts,

  };

    return { labels, docCounts,warningCounts,okCounts, criticalCounts };
  }



  createChart(data: any) {
    const canvas: any = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');


    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Evolution du doc_count',
            data: data.docCounts,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
            title: {
              display: true,
              text: 'Jour',
            },
          },
          y: {
            title: {
              display: true,
              text: 'doc_count',
            },
          },
        },
      },
    });
  }


  createChartTest() {
    console.log("data from chart js ", this.data.labels);
    console.log("values from chart js ", this.data.docCounts);
    console.log("data.this.data.warningCounts",this.data.warningCounts)
    console.log("values from chart js okCounts", this.data.criticalCounts);


    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: this.data.labels,
        datasets: [
          {
            label: "Critical",
            data: this.data.criticalCounts,
            backgroundColor: 'red'
          },
          {
            label: "Warning",
            data: this.data.warningCounts,
            backgroundColor: 'orange'
          },
          {
            label: "OK",
            data: this.data.okCounts,
            backgroundColor: 'green'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  refreshPage(): void {
    this.router.navigate(['./refresh'], { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }



}
