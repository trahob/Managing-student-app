import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  readonly API = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getData(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.API}/students`);
  }
  addStudent(data:any) {
    return this.http.post(`${this.API}/students`, data)
  }
  deleteStudent(id:number) {
    return this.http.delete(`${this.API}/students/${id}`)
  }
  getDetailStudent(id:number) {
    return this.http.get<Student[]>(`${this.API}/students/${id}`)
  }
  updateStudent(id:number, data:any) {
    return this.http.put(`${this.API}/students/${id}`, data)
  }
}
