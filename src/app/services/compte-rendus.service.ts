// compte-rendus.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlConnectionService } from './url-connection.service';
  import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompteRendusService {
  private url = this.urlConnectionService.getUrlService();
  private url2 = this.urlConnectionService.getUrlServiceSearch();

  private username = environment.apiUsername;
  private password = environment.apiPassword;


  constructor(private http: HttpClient, private urlConnectionService: UrlConnectionService) {}

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

  findAll() {
    // Obtenez les en-têtes d'authentification
    const headers = this.getHeaders();

    return this.http.post<any[]>(this.url, {
      "size": 0,
      "aggs": {
        "unique_values": {
          "terms": {
            "field": "sid.keyword",
            "size": 10
          }
        }
      }
    }, { headers });
  }

  findOK() {
    // Obtenez les en-têtes d'authentification
    const headers = this.getHeaders();

    return this.http.post<any[]>(this.url, {
      "size": 0,
      "aggs": {
        "unique_values": {
          "terms": {
            "field": "level.keyword",
            "size": 10
          }
        }
      }
    }, { headers });
  }

  findDashboard() {
    // Obtenez les en-têtes d'authentification
    const headers = this.getHeaders();

    // Obtenez la date d'aujourd'hui au format ISO8601 (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];

    return this.http.post<any[]>(this.url, {
      "size": 0,
      "query": {
        "bool": {
          "filter": [
            {
              "range": {
                "timestamp": {
                  "gte": "now/d",
                  "lt": "now+1d/d"// if you have an end date (exclusive)
                }
              }
            }
          ]
        }
      },
      "aggs": {
        "unique_values": {
          "terms": {
            "field": "level.keyword",
            "size": 10
          }
        }
      }
    }, { headers });
  }

  public search(index: string, query: object) {
    // Obtenez les en-têtes d'authentification
    const headers = this.getHeaders();

    return this.http.post(this.url2, query, { headers });
  }
}
