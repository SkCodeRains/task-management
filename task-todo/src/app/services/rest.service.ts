import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itask } from '../components/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  URL = "http://localhost:3000/"
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  login(form: any): Observable<any> {
    return this.http.post<any>(`${this.URL}signin.ss`, form)
  }
  signUp(form: any): Observable<any> {
    return this.http.post<any>(`${this.URL}signup.ss`, form)
  }

  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.URL}getTasks.ss`);
  }

  deleteTask(task: Itask): Observable<any> {
    return this.http.post<any>(`${this.URL}deleteTask.ss`, task);
  }

  createTask(task: Itask): Observable<any> {
    return this.http.post(`${this.URL}createTask.ss`, task);
  }

  updateTask(task: Itask): Observable<any> {
    return this.http.post<any>(`${this.URL}updateTask.ss`, task);
  }
  updateProfile(formData: FormData|any): Observable<any> {
    return this.http.post<any>(`${this.URL}updateProfile.ss`, formData);
  }
}
