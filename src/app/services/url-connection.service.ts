import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlConnectionService {
  urlService:any = "http://35.153.10.159:9200/porteilsap/_search?size=1000"
  urlServiceSearch:any = "http://35.172.209.183:9200"
  urlBackup:any ="http://35.153.10.159:9200/backup/_search?size=1000";
  urlJob:any ="http://35.153.10.159:9200/jobs/_search?size=1000";
  historiqueApiUrl = "http://35.153.10.159:9200/porteilsap/_search?size=1000";
  historiqueUrl = "http://35.153.10.159:9200/test/_count?q=Niveau:OK";
  adminUrl = "http://35.153.10.159:3000/"

  geturlBackup(){
    return this.urlBackup
  }
  getUrlService(){
    return this.urlService
  }
  getUrlServiceSearch(){
    return this.urlServiceSearch
  }
  getUrlJob(){
    return this.urlJob
  }
  getHistoriqueUrl(){
    return this.historiqueUrl
  }
  getHistoriqueApiUrl(){
    return this.historiqueApiUrl
  }
  getAdminUrl(){
    return this.adminUrl
  }

  constructor() { }
}
