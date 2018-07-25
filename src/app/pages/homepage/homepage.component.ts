import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/authservice';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public chat: any = { message: '' };
  public chatMessages: any[] = [];
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

  constructor(
    public authservice: AuthService,
    public router: Router
  ) { }

  public ngOnInit() {
  }

  public sendMessage(text: string) {
    const author1: any = { name: 'me', id: 1 };
    const author2: any = { name: 'Some idiot', id: 2 };
    const id: number = this.chatMessages.length + 1;
    const message: any = {
      text,
      id,
      author: !(id % 2) ? author1.name : author2.name,
      timestamp: new Date().toISOString()
    };
    this.chatMessages.push(message);
    this.chat.message = '';
  }
  public quit() {
    this.authservice.logOutFunk();
  }
}
