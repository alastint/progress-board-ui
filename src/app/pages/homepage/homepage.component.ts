import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/authservice';
import {Router} from '@angular/router';
import {ApiService} from '../../../services/api';
import {UserService} from '../../../services/userservice';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public chat: any = { message: '' };
  public chatMessages: any[] = [];
  public urlParams = '';
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
  public authorId = 2;

  constructor(
    public authservice: AuthService,
    public api: ApiService,
    public userservice: UserService
  ) { }

  public ngOnInit() {
    this.loadChat();
  }
  public getUserData() {
    // Retrieve data by key from local storage
    const userString: string = localStorage.getItem('currentUser');
    // Return user object if data in local storage exist, or empty object if no user data available
    return typeof userString === 'string' ? JSON.parse(userString) : {};
  }
  public sendMessage(text: string) {
    const author1: any = { name: 'me', authorId: 1 };
    const author2: any = { name: 'Some idiot', authorId: 2 };
    const appUser: any = this.getUserData();
    const message: any = {
      text,
      author: !(this.authorId % 2 && this.authorId !== 0) ? author1.name : author2.name,
      timestamp: new Date().toISOString()
    };
    this.chatMessages.push(message);
    console.log('message.text', message.text);
    this.api.post(`/message`, {text: message.text, userId: appUser.id}).subscribe(
      (resp: any) => {
        console.log('resp', resp);
      }
    );
    this.chat.message = '';
  }
  public loadChat() {
    const appUser: any = this.getUserData();
    const author1: any = { name: 'me', authorId: 1 };
    const author2: any = { name: 'Some idiot', authorId: 2 };
    let messageString = '';
    this.urlParams = `?page=1&limit=10&order={"createdAt":-1}`;
    console.log(this.urlParams);
    this.userservice.getMessage(this.urlParams).subscribe(
      (responseLoad: any) => {
        for (let i = responseLoad.rows.length - 1; i >= 0; i--) {
          messageString = responseLoad.rows[i].userId;
          appUser.id === messageString ? this.authorId = 2 : this.authorId = 1;
          console.log('this.authorId', this.authorId);
          const historyMessage = {
            text: responseLoad.rows[i].text,
            author: !(this.authorId % 2 || this.authorId === 0) ? author1.name : author2.name,
            timestamp: responseLoad.rows[i].createdAt
          };
          this.chatMessages.push(historyMessage);
        }
      }
    );
  }
  public quit() {
    this.authservice.logOutFunk();
  }
}
