import {Injectable, OnInit} from '@angular/core';
import {UserService} from '../userservice';
import {ApiService} from '../api';

@Injectable()
export class MessageService {
  public chat: any = { message: '', newsMessage: ''};
  public chatMessages: any[] = [];
  public newsBlock: any[] = [];
  public urlParams = '';
  public urlParamsNews = '';
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
      },
    (err) => {
        console.log (err);
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
          this.authorId = appUser.id === messageString ? 1 : 2;
          if (!(responseLoad.rows[i].status === '[NEWS]')) {
            const historyMessage = {
              text: responseLoad.rows[i].text,
              author: !(this.authorId % 2 || this.authorId === 0) ? author1.name : author2.name,
              align: (this.authorId % 2 || this.authorId === 0) ? 1 : 2,
              timestamp: responseLoad.rows[i].createdAt
            };
            this.chatMessages.push(historyMessage);
          }
        }
      },
    (err) => {
      console.log (err);
    }
    );
  }
  public newsBlockfunc() {
    this.urlParamsNews = `?page=1&limit=2&order={"createdAt":-1}&where={"status":"[NEWS]"}`;
    this.userservice.getMessage(this.urlParamsNews).subscribe(
      (responseLoad: any) => {
        for (let i = 0; i < responseLoad.rows.length; i++) {
          if ((responseLoad.rows[i].status === '[NEWS]')) {
            const newsMessage = {
              text: responseLoad.rows[i].text,
              timestamp: responseLoad.rows[i].createdAt
            };
            this.newsBlock.push(newsMessage);
          }
        }
      },
      (err) => {
        console.log (err);
      }
    );
  }
  public sendNews(text: string) {
    const appUser: any = this.getUserData();
    const newsMessage: any = {
      text,
      timestamp: new Date().toISOString()
    };
    this.newsBlock.push(newsMessage);
    console.log('message.text', newsMessage.text);
    this.api.post(`/message`, {text: newsMessage.text, userId: appUser.id, status: '[NEWS]' }).subscribe(
      (resp: any) => {
        console.log('resp', resp);
      },
      (err) => {
        console.log (err);
      }
    );
    this.newsBlock = [];
    this.chat.newsMessage = '';
    this.newsBlockfunc();
  }
}
