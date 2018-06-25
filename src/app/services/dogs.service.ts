import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable()
export class DogsService {
  private dogs = [];
  private dogsFiltered = [];
  public dogsSubject = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  public getDogImage(): Observable<any> {
    return this.http.get('https://dog.ceo/api/breeds/image/random');
  }

  public addDog(dog) {
    this.dogs.push(dog);
    this.dogsSubject.next(this.dogs);
  }

  public getDogs() {
    return this.dogs;
  }

  public searchByName(value) {
    this.dogsFiltered = this.dogs.filter(d => d.name.toLowerCase().indexOf(value.toLowerCase()) != -1);
    this.dogsSubject.next(this.dogsFiltered);
  }
}
