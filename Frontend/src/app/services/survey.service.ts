import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class SurveyService {

  constructor(private http: HttpClient) { }

  set(id, survey): Observable<{ success: boolean, message: string }> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<{ success: boolean, message: string }>(`http://localhost:5000/survey/create/${id}`, { survey }, { headers: headers });
  }

  getBySubjectId(id): Observable<{ success: boolean, message: string, survey: any }> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<{ success: boolean, message: string, survey: any }>(`http://localhost:5000/survey/${id}`, { headers: headers });
  }

  getCount(subjectId, questionId) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<{ result: [], count: number }>(`http://localhost:5000/survey/${subjectId}/${questionId}`, { headers: headers });
  }
}
