// backups.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios from 'axios';
import { UrlConnectionService } from './url-connection.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BackupsService {
  constructor(private http: HttpClient, private urlConnectionService: UrlConnectionService) {}

  private apiurl = this.urlConnectionService.geturlBackup();
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

  findAll() {
    // Obtenez les en-têtes d'authentification
    const headers = this.getHeaders();

    return this.http.post<any[]>(this.apiurl, {
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "type": "DATA"
              }
            }
          ]
        }
      }
    }, { headers });
  }

  findLog() {
    // Obtenez les en-têtes d'authentification
    const headers = this.getHeaders();

    return this.http.post<any[]>(this.apiurl, {
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "type": "LOG"
              }
            },
            {
              "range": {
                "timestamp": {
                  "lt": "now"
                }
              }
            }
          ]
        }
      }
    }, { headers });
  }

  find(type: any) {
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
              "match": {
                "type": "DATA"
              }
            },
            {
              "range": {
                "timestamp": {
                  "lt": "now"
                }
              }
            }
          ]
        }
      }
    }, { headers });
  }

  findLogSid(type: any) {
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
              "match": {
                "type": "LOG"
              }
            },
            {
              "range": {
                "timestamp": {
                  "lt": "now"
                }
              }
            }
          ]
        }
      }
    }, { headers });
  }

  chart() {
    // Obtenez les en-têtes d'authentification
    const headers = this.getHeaders();

    const data: any = this.http.post<any[]>(this.apiurl, {
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

    return data;
  }

  findSid() {
    // Obtenez les en-têtes d'authentification
    const headers = this.getHeaders();

    return this.http.post<any[]>(this.apiurl, {
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

    return this.http.post<any[]>(this.apiurl, {
      "size": 0,
      "aggs": {
        "unique_values": {
          "terms": {
            "field": "state_name.keyword",
            "size": 10
          }
        }
      }
    }, { headers });
  }
}
