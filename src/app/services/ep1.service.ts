// ep1.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EP1 } from '../models/ep1';
import { environment } from 'src/environments/environment';
import { UrlConnectionService } from './url-connection.service';
@Injectable({
  providedIn: 'root'
})
export class EP1Service {

  private apiurl = this.urlConnectionService.getHistoriqueApiUrl();
  private url = "http://44.212.26.57:9200/test/_count?q=Niveau:OK";

  private username = environment.apiUsername;
  private password = environment.apiPassword;


  constructor(private http: HttpClient, private urlConnectionService: UrlConnectionService) { }

  private getHeaders(): HttpHeaders {
    // Créez l'en-tête "Authorization" avec les informations d'identification au format Base64
    const authHeader = 'Basic ' + btoa(this.username + ':' + this.password);

    // Créez les en-têtes pour la requête
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authHeader
    });

    return headers;
  }

  findAll(type: any) {
    // Obtenez les en-têtes d'authentification
    const headers = this.getHeaders();

    return this.http.post<any[]>(this.apiurl, {
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "sid": type
              }
            },
            {
              "range": {
                "timestamp": {
                  "gte": "now/d",
                  "lt": "now+1d/d"
                }
              }
            }
          ]
        }
      }
    }, { headers });
  }

  find() {
    // Obtenez les en-têtes d'authentification
    const headers = this.getHeaders();

    return this.http.post<EP1[]>(this.apiurl, {
      "query": { "match_all": {} }
    }, { headers });
  }

  countNiveau() {
    // Obtenez les en-têtes d'authentification
    const headers = this.getHeaders();

    return this.http.get<any[]>(this.url, { headers });
  }
}
