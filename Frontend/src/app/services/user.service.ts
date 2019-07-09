import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { Subject } from "../models/subject.model";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  index: number;
  user$ = [
    {
      id: 1,
      name: 'عمر جميل شتا',
      email: 'omar@test.com',
      classroom: 4,
      semester: 2,
      password: 12345
    },
    {
      id: 2,
      name: 'كريم محمود الشندي',
      email: 'kareem@test.com',
      classroom: 3,
      semester: 2,
      password: 12345
    },
    {
      id: 3,
      name: 'محمد جابر زكريا',
      email: 'mohamed@test.com',
      classroom: 1,
      semester: 2,
      password: 12345
    },
  ];

  set(user): Observable<{ success: boolean, message: string }> {
    console.log(user);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    var formData = new FormData;
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('department', user.department);
    formData.append('classroom', user.classroom);
    formData.append('semester', user.semester);
    formData.append('city', user.city);
    formData.append('mobile', user.mobile);
    formData.append('avatar', user.avatar);
    return this.http.post<{ success: boolean, message: string }>('http://localhost:5000/user/create', formData, { headers: headers });
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:5000/user');
  }

  getById(id): Observable<User> {
    return this.http.get<User>(`http://localhost:5000/user/${id}`);
  }

  update(id, user): Observable<{ success: boolean, message: string }> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    var formData = new FormData;
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('department', user.department);
    formData.append('classroom', user.classroom);
    formData.append('semester', user.semester);
    formData.append('city', user.city);
    formData.append('mobile', user.mobile);
    formData.append('avatar', user.avatar);
    return this.http.put<{ success: boolean, message: string }>(`http://localhost:5000/user/${id}`, formData, { headers: headers });
  }

  delete(id) {
    return this.http.delete<User>(`http://localhost:5000/user/${id}`);
  }

  getCurrentUser(): Observable<{success: boolean, user: User}> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const httpOptions = { headers: headers_object };
    return this.http.get<{success: boolean, user: User}>('http://localhost:5000/user/current', httpOptions);
  }

  changePassword(data): Observable<{ success: boolean, message: string }> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const httpOptions = { headers: headers_object };
    return this.http.post<{ success: boolean, message: string }>('http://localhost:5000/user/change-password', {...data}, httpOptions);
  }

  setAnsweredSubject(subjectId): Observable<{ success: boolean }> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const httpOptions = { headers: headers_object };
    return this.http.put<{ success: boolean }>('http://localhost:5000/user/AnsweredSuject', { subjectId: subjectId }, httpOptions);
  }
}
