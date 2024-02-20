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
                  "gte": "now/d",
                  "lt": "now+1d/d"// if you have an end date (exclusive)

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
                  "gte": "now/d",
                  "lt": "now+1d/d"// if you have an end date (exclusive)
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
  findDashboard() {
    // Obtenez les en-têtes d'authentification
    const headers = this.getHeaders();

    // Obtenez la date d'aujourd'hui au format ISO8601 (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];

    return this.http.post<any[]>(this.apiurl, {
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
            "field": "state_name.keyword",
            "size": 10
          }
        }
      }
    }, { headers });}
    findDashboardForMonth() {
      // Obtenez les en-têtes d'authentification
      const headers = this.getHeaders();

      // Obtenez la date d'aujourd'hui
      const today = new Date();

      // Construisez la date du premier jour du mois en cours
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const firstDayOfMonthISO = firstDayOfMonth.toISOString().split('T')[0];

      // Construisez la date du premier jour du mois suivant
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // dernier jour du mois en cours
      const lastDayOfMonthISO = lastDayOfMonth.toISOString().split('T')[0];

      return this.http.post<any[]>(this.apiurl, {
        "size": 0,
        "query": {
          "bool": {
            "filter": [
              {
                "range": {
                  "timestamp": {
                    "gte": firstDayOfMonthISO,
                    "lt": lastDayOfMonthISO
                  }
                }
              }
            ]
          }
        },
        "aggs": {
          "daily_values": {
            "date_histogram": {
              "field": "timestamp",
              "interval": "day", // Agréger par jour
              "format": "yyyy-MM-dd",
              "min_doc_count": 0, // Inclure les jours sans données
              "extended_bounds": {
                "min": firstDayOfMonthISO,
                "max": lastDayOfMonthISO
              }
            },
            "aggs": {
              "unique_values": {
                "terms": {
                  "field": "state_name.keyword",
                  "size": 10
                }
              }
            }
          }
        }
      }, { headers });
    }


}
