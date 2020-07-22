import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  constructor(private http: HttpClient) { }

  public getPeople(): Observable<any> {
    return this.http.get<any>('/api/person');
  }

  public addPerson(person: Person): Observable<any> {
    return this.http.put<any>('/api/person', person);
  }

  public deletePerson(id: string): Observable<any> {
    return this.http.delete<any>(`/api/person/${id}`);
  }

  public updatePerson(person: Person) {
    return this.http.post(`/api/person/${person._id}`, person);
  }
}

export class Person {
  constructor(obj) {
    this.first = obj.first;
    this.last = obj.last;
    this._id = obj._id;
  }
  _id: string;
  first: string;
  last: string;
}