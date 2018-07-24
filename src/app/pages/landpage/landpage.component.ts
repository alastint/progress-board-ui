import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.css']
})
export class LandpageComponent implements OnInit {
  public showRegist = false;

  constructor() { }

  public ngOnInit() {
  }

  public registFunc() {
    console.log('confirm clicked');
    this.showRegist = false;
  }
  public reject() {
    console.log('reject clicked');
    this.showRegist = false;
  }
}
