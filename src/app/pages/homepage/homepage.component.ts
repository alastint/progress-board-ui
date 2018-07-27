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
  public newsInputOpen = false;

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
