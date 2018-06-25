declare var require: any;

import { Component, OnInit } from '@angular/core';
import { DogsService } from '../../services/dogs.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  private dogNames = require('dog-names');
  public dog = {
    name: '',
    image: ''
  }

  constructor(
    private snackbar: MatSnackBar,
    private dogs: DogsService
  ) { }

  ngOnInit() {
    this.getDog();
  }

  private getDog() {
    this.dogs.getDogImage().subscribe(
      data => {
        this.dog = {
          name: this.dogNames.allRandom(),
          image: data.message
        }
      },
      error => {
        this.snackbar.open('The page is currently offline', 'Close', {
          duration: 10000
        });
      }
    );
  }

  public favorite() {
    this.dogs.addDog(this.dog);
    this.getDog();
  }

  public clear() {
    this.getDog();
  }

  public swipe(action) {
    switch (action) {
      case 'swipeleft':
        this.clear();
        break;
      case 'swiperight':
        this.favorite();
        break;
    }
  }
}