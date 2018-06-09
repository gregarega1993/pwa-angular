declare var require: any;

import { Component, OnInit } from '@angular/core';
import { DogsService } from '../../services/dogs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  // constant for swipe action: left or right
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  private dogNames = require('dog-names');

  public dog = {
    name: '',
    image: ''
  }
  //public imageUrl: '';

  constructor(
    private dogs: DogsService
  ) { }

  ngOnInit() {
    this.getDog();
  }

  private getDog() {
    this.dogs.getDogImage().subscribe(val => {
      this.dog = {
        name: this.dogNames.allRandom(),
        image: val.message
      }
    });
  }

  public like() {
    this.dogs.addDog(this.dog);
    this.getDog();
  }

  public skip() {
    this.getDog();
  }

  public swipe(action) {
    switch(action) {
      case 'swipeleft':
        this.skip();
        break;
      case 'swiperight':
        this.like();
        break;
    }
  }

}
