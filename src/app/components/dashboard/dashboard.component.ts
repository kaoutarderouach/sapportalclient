import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Observable,Subscription, interval  } from 'rxjs';
import { BackupsService } from 'src/app/services/backups.service';
import { CompteRendusService } from 'src/app/services/compte-rendus.service';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public chart: any;
  public chartBackup:any;
  public chartJob:any;
   data: any;
   dataBackup: any;
   dataJob: any;
   currentMonth: string ="";
  constructor(private backupservice:BackupsService, private jobservice: JobService, private compteRendu:CompteRendusService,private router: Router){

  }

  getBackup(){
   this.compteRendu.findAll()
        .subscribe(tasks => {this.resultTasks = this.tasks = tasks})

  }
  setCurrentMonth() {
    const currentDate = new Date();
    const options = { month: 'long' } as Intl.DateTimeFormatOptions;
    this.currentMonth = new Intl.DateTimeFormat('fr-FR', options).format(currentDate);
    
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
    this.loadData();
    this.loadDataBackup();
    this.loadDataJob();
    this.setCurrentMonth();


  }
  loadData() {
    this.compteRendu.findDashboardForMonth().subscribe((response) => {

      this.data = this.processData(response);

    //  this.createChart(this.data);
      this.createChartSys()

    });
  }
  loadDataBackup() {
    this.backupservice.findDashboardForMonth().subscribe((response) => {

      this.dataBackup = this.processDataBackup(response);

    //  this.createChart(this.data);
      this.createChartBackup()

    });
  }
  loadDataJob() {
    this.jobservice.findDashboardForMonth().subscribe((response) => {

      this.dataJob = this.processDataJob(response);

    //  this.createChart(this.data);
      this.createChartJob()

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
  processDataBackup(response: any) {
    const labels: any[] = [];
    const docCounts: any[] = [];
    const failedCounts: any[] = [];
    const runningCounts: any[] = [];
    const successfulCounts: any[] = [];

    response.aggregations.daily_values.buckets.forEach((day: any) => {
      labels.push(day.key_as_string);
     // docCounts.push(day.unique_values.buckets.key);

     const uniqueValuesBucket = day.unique_values.buckets;

     // Recherchez les valeurs "Critical", "Warning" et "OK" dans le seau unique_values
     const failedValue = uniqueValuesBucket.find((item: any) => item.key === 'failed');
     const runningValue = uniqueValuesBucket.find((item: any) => item.key === 'running');
     const successfulValue = uniqueValuesBucket.find((item: any) => item.key === 'successful');

     // Ajoutez les doc_count correspondants aux tableaux respectifs
     failedCounts.push(failedValue ? failedValue.doc_count : 0);
     runningCounts.push(runningValue ? runningValue.doc_count : 0);
     successfulCounts.push(successfulValue ? successfulValue.doc_count : 0);
   });


  this.dataBackup = {
    labels: labels,
    docCounts: docCounts,
    runningCounts: runningCounts,
    successfulCounts: successfulCounts,
    failedCounts: failedCounts,

  };

    return { labels, docCounts,runningCounts,successfulCounts, failedCounts };
  }


  processDataJob(response: any) {
    const labels: any[] = [];
    const docCounts: any[] = [];
    const SuspenduCounts: any[] = [];
    const encoursCounts: any[] = [];
    const PlanifieCounts: any[] = [];

    response.aggregations.daily_values.buckets.forEach((day: any) => {
      labels.push(day.key_as_string);
     // docCounts.push(day.unique_values.buckets.key);

     const uniqueValuesBucket = day.unique_values.buckets;

     // Recherchez les valeurs "Critical", "Warning" et "OK" dans le seau unique_values
     const SuspenduValue = uniqueValuesBucket.find((item: any) => item.key === 'Suspendu');
     const encoursValue = uniqueValuesBucket.find((item: any) => item.key === 'En cours');
     const PlanifieValue = uniqueValuesBucket.find((item: any) => item.key === 'Planifié');

     // Ajoutez les doc_count correspondants aux tableaux respectifs
     SuspenduCounts.push(SuspenduValue ? SuspenduValue.doc_count : 0);
     encoursCounts.push(encoursValue ? encoursValue.doc_count : 0);
     PlanifieCounts.push(PlanifieValue ? PlanifieValue.doc_count : 0);
   });


  this.dataJob = {
    labels: labels,
    docCounts: docCounts,
    encoursCounts: encoursCounts,
    PlanifieCounts: PlanifieCounts,
    SuspenduCounts: SuspenduCounts,

  };

    return { labels, docCounts,encoursCounts,PlanifieCounts, SuspenduCounts };
  }

  createChartBackup() {



    this.chartBackup = new Chart("MyChartBackup", {
      type: 'line',
      data: {
        labels: this.dataBackup.labels,
        datasets: [
          {
            label: "failed",
            data: this.dataBackup.failedCounts,
            backgroundColor: 'red'
          },
          {
            label: "running",
            data: this.dataBackup.runningCounts,
            backgroundColor: 'orange'
          },
          {
            label: "successful",
            data: this.dataBackup.successfulCounts,
            backgroundColor: 'green'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
  createChartJob() {



    this.chartJob= new Chart("MyChartJob", {
      type: 'line',
      data: {
        labels: this.dataJob.labels,
        datasets: [
          {
            //encoursCounts,PlanifieCounts, SuspenduCounts
            label: "Suspendu",
            data: this.dataJob.SuspenduCounts,
            backgroundColor: 'red'
          },
          {
            label: "Planifié",
            data: this.dataJob.PlanifieCounts,
            backgroundColor: 'orange'
          },
          {
            label: "En cours",
            data: this.dataJob.encoursCounts,
            backgroundColor: 'green'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
  createChartSys() {



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
