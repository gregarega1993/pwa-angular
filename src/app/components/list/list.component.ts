import { Component, OnInit } from '@angular/core';
import { DogsService } from '../../services/dogs.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public dogsList = [];

  constructor(
    private dogs: DogsService
  ) { }

  ngOnInit() {
    this.dogs.dogsSubject.subscribe(val => {
      this.dogsList = val;
    })
  }

}
