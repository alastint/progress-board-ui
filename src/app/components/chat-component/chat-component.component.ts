import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from "../../../services/messageservice";
import {ApiService} from "../../../services/api";

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css']
})
export class ChatComponentComponent {
  public urlParams = '';
  public urlParamsNews = '';
  public chat: any = { message: '', newsMessage: ''};
  public chatMessages: any[] = [];
  public newsBlock: any[] = [];
  private authorId = 0;

  constructor(
    public messageService: MessageService,
    public api: ApiService
  ) { }

  /**
   * load chat history
   */
  public loadChat() {
    const appUser: any = this.messageService.getUserData();
    this.urlParams = `?page=1&limit=10&order={"createdAt":-1}`;
    console.log(this.urlParams);
    this.messageService.getMessage(this.urlParams).subscribe(
      (responseLoad: any) => {
        console.log('responseLoad', responseLoad);
        for (let i = responseLoad.rows.length - 1; i >= 0; i--) {
          this.authorId = appUser.id === responseLoad.rows[i].userId ? 1 : 2;
          if (!(responseLoad.rows[i].status === '[NEWS]')) {
            console.log(i);
            const historyMessage = {
              text: responseLoad.rows[i].text,
              align: (this.authorId % 2 || this.authorId === 0) ? 1 : 2,
              timestamp: responseLoad.rows[i].createdAt
            };
            console.log('historyMessage', historyMessage);
            this.chatMessages.push(historyMessage);
          }
        }
      },
      (err) => {
        console.log (err);
      }
    );
  }

  public sendChatMessage() {
    if (this.chat.message) {
      this.sendMessage(this.chat.message);
    }
  }

  /**
   * send message to chat
   * @param {string} text
   */
  public sendMessage(text: string) {
    const author1: any = { name: 'me', authorId: 1 };
    const author2: any = { name: 'Some idiot', authorId: 2 };
    const appUser: any = this.messageService.getUserData();
    const message: any = {
      text: this.chat.message,
      author: !(this.authorId % 2 && this.authorId !== 0) ? author1.name : author2.name,
      timestamp: new Date().toISOString()
    };
    console.log('appUser.id',message.text, appUser.id);
    this.chatMessages.push(message);
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



  /**
   * load last news
   */
  public newsBlockfunc() {
    this.urlParamsNews = `?page=1&limit=2&order={"createdAt":-1}&where={"status":"[NEWS]"}`;
    this.messageService.getMessage(this.urlParamsNews).subscribe(
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

  /**
   * send news to the server
   * @param {string} text
   */
  public sendNews(text: string) {
    const appUser: any = this.messageService.getUserData();
    const newsMessage: any = {
      text,
      timestamp: new Date().toISOString()
    };
    this.newsBlock.push(newsMessage);
    // this.messageService.postNews(newsMessage.text, appUser.id, '[NEWS]' )
    this.api.post(`/message`, {text: newsMessage.text, userId: appUser.id, status: '[NEWS]' }).subscribe(
      (resp) => {
        console.log('resp', resp)
      },
      (err) => {
        console.log('err', err)
      }
    );
    this.newsBlock = [];
    this.chat.newsMessage = '';
    this.newsBlockfunc();
  }

}
