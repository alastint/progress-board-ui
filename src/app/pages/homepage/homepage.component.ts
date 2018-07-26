import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/authservice';
import {MessageService} from '../../../services/messageservice';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public appUser = this.messageService.getUserData();
  public userEmail: '';
  public adminUserId: boolean;
  public newsInputOpen = false;
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
    public messageService: MessageService
  ) { }

  public ngOnInit() {
    this.messageService.loadChat();
    setInterval(function() {
      this.messageService.loadChat();
    }, 300000);
    this.messageService.newsBlockfunc();
  }
  public openInput() {
    this.newsInputOpen = !this.newsInputOpen;
  }
  public getCurrentUser() {
    // Retrieve data by key from local storage
    const userString: string = localStorage.getItem('currentUser');
    // Return user object if data in local storage exist, or empty object if no user data available
    return typeof userString === 'string' ? JSON.parse(userString) : {};
  }
  public quit() {
    this.authservice.logOutFunk();
  }
  public sendChatMessage() {
    if (this.messageService.chat.message) {
      this.messageService.sendMessage(this.messageService.chat.message);
    }
  }
  public sendNewsFunc() {
    if (this.messageService.chat.newsMessage) {
      this.messageService.sendNews(this.messageService.chat.newsMessage);
    }
  }
}
