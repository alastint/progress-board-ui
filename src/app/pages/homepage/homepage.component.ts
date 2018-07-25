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
  quit() {
    this.authservice.logOutFunk();
    console.log('Log out sucsess');
    this.router.navigate([ '', 'land']);
  }
}
