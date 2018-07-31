import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MessageService} from "../../../services/messageservice";
import {ApiService} from "../../../services/api";

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css']
})
export class ChatComponentComponent {
  public urlParams = '';
  public chat: any = { message: ''};
  public chatMessages: any[] = [];
  private authorId = 0;
  @Input() options: any = { };
  @Output() doConfirm: any = new EventEmitter();

  constructor(
    public messageService: MessageService,
    public api: ApiService
  ) { }

  ngOnInit(){
    this.loadChat();
  }

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
          if (!(responseLoad.rows[i].status == '[NEWS]')) {
            console.log(i);
            const historyMessage = {
              text: responseLoad.rows[i].text,
              align: (this.authorId % 2 || this.authorId === 0) ? 1 : 2,
              timestamp: responseLoad.rows[i].createdAt
            };
            this.chatMessages.push(historyMessage);
            console.log('historyMessage', historyMessage, 'this.chatMessages', this.chatMessages);
          }
        }
      },
      (err) => {
        console.log (err);
      }
    );
  }

  /**
   * checking does message is empty, if not push it to backend
   */
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
    // this.api.post(`/message`, {text: message.text, userId: appUser.id})
    this.messageService.postMessage(message.text, appUser.id).subscribe(
      (resp: any) => {
        console.log('resp', resp);
      },
      (err) => {
        console.log (err);
      }
    );
    this.chat.message = '';
  }
}
