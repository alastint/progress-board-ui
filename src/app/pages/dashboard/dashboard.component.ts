import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public studentsScore: any[] =  [
    { position: 1, email: 'some@email.com', score: 817, rank: 'Mentor', },
    { position: 2, email: 'some@email.com', score: 717, rank: 'Mentor', },
    { position: 3, email: 'some@email.com', score: 700, rank: 'Mentor', },
    { position: 4, email: 'some@email.com', score: 562, rank: 'Mentor', },
    { position: 5, email: 'some@email.com', score: 460, rank: 'Mentor', },
    { position: 6, email: 'some@email.com', score: 400, rank: 'Mentor', },
    { position: 7, email: 'some@email.com', score: 350, rank: 'Mentor', },
    { position: 8, email: 'some@email.com', score: 268, rank: 'Mentor', },
    { position: 9, email: 'some@email.com', score: 199, rank: 'Mentor', },
    { position: 10, email: 'some@email.com', score: 100, rank: 'Mentor', }
  ];
  constructor() { }

  ngOnInit() {
  }

}
