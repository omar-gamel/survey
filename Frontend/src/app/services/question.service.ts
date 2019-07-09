import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Question } from "../models/question.model";

@Injectable()
export class QuestionService {
  constructor(private http: HttpClient) { }
  index: number;
  survey$ = [
    {
      id: 1,
      name: 'مدى وضوح المستهدف من تدريس المقرر في بداية الفصل الدراسي.',
      type: 5
    },
    {
      id: 2,
      name: 'مدى وضوح المستهدف من تدريس المقرر في بداية الفصل الدراسي.',
      type: 5
    },
    {
      id: 3,
      name: 'مدى وضوح المستهدف من تدريس المقرر في بداية الفصل الدراسي.',
      type: 5
    },
  ];

  set(survey) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<{ success: boolean, message: string }>('http://localhost:5000/question/create', { ...survey }, { headers: headers });
  }

  getAll(): Observable<Question[]> {
    return this.http.get<Question[]>('http://localhost:5000/question/all');
  }

  getById(id): Observable<Question> {
    return this.http.get<Question>(`http://localhost:5000/question/${id}`);
  }

  getByType(questionType): Observable<Question[]> {
    return this.http.get<Question[]>(`http://localhost:5000/question/survey/${questionType}`);
  }

  update(id, newQuestion): Observable<{ success: boolean, message: string }> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put<{ success: boolean, message: string }>(`http://localhost:5000/question/${id}`, { ...newQuestion }, { headers: headers });
  }

  delete(id) {
    return this.http.delete<Question>(`http://localhost:5000/question/${id}`);
  }


}
