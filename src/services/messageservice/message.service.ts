import {Injectable, OnInit} from '@angular/core';
import {UserService} from '../userservice';
import {ApiService} from '../api';

@Injectable()
export class MessageService {
  public chat: any = { message: '', historyMessage: '' };
  public chatMessages: any[] = [];
  public urlParams = '';
  private authorId = 0;
  //
  constructor(
    public api: ApiService,
    public userservice: UserService
  ) { }
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
        console.log('responseLoad', responseLoad);
        for (let i = responseLoad.rows.length - 1; i >= 0; i--) {
          messageString = responseLoad.rows[i].userId;
          this.authorId = appUser.id === messageString ? 1 : 2;
          console.log('this.authorId', this.authorId, 'messageString', messageString );
          const historyMessage = {
            text: responseLoad.rows[i].text,
            author: !(this.authorId % 2 || this.authorId === 0) ? author1.name : author2.name,
            align: (this.authorId % 2 || this.authorId === 0) ? 1 : 2,
            timestamp: responseLoad.rows[i].createdAt
          };
          console.log('align', historyMessage.align);
          this.chatMessages.push(historyMessage);
          console.log(this.chatMessages);
        }
      }
    );
  }
}
