// historique.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlConnectionService } from './url-connection.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  constructor(private http: HttpClient, private urlConnectionService: UrlConnectionService) { }
  private apiurl = this.urlConnectionService.getHistoriqueApiUrl();
  private url = this.urlConnectionService.getHistoriqueUrl();

  private username = environment.apiUsername;
  private password = environment.apiPassword;

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

    return this.http.post<any[]>(this.apiurl,
      {
        "query": {
          "bool": {
            "must": [
              {
                "match": {
                  "timestamp": type
                }
              },
              {
                "range": {
                  "timestamp": {
                    "gte": "now-1d/d",
                    "lt": "now/d"
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

    return this.http.post<any[]>(this.apiurl, {
      "query": { "match_all": {} }
    }, { headers });
  }

  countNiveau() {
    // Obtenez les en-têtes d'authentification
    const headers = this.getHeaders();

    return this.http.get<any[]>(this.url, { headers });
  }
}
