import {AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MessageService} from "../../../services/messageservice";
import {ApiService} from "../../../services/api";

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css']
})
export class ChatComponentComponent implements  OnInit, AfterViewChecked{
  @ViewChild('chatMessagesContainer') public scrolledChat: ElementRef;
  public urlParams = '';
  public chat: any = { message: ''};
  public chatMessages: any[] = [];
  public author = '';
  @Input() options: any = { };
  @Output() doConfirm: any = new EventEmitter();

  constructor(
    public messageService: MessageService,
    public api: ApiService
  ) { }

  ngOnInit(){
    this.loadChat();
  }

  public ngAfterViewChecked() {
    this.scrollChat();
  }

  /**
   * load chat history
   */
  public loadChat() {
    const appUser: any = this.messageService.getUserData();
    console.log('appUser', appUser.fullname);
    this.urlParams = `?page=1&limit=10&order={"createdAt":-1}`;
    console.log(this.urlParams);
    this.messageService.getMessage(this.urlParams).subscribe(
      (responseLoad: any) => {
        console.log('responseLoad', responseLoad);
        for (let i = responseLoad.rows.length - 1; i >= 0; i--) {
          if (!(responseLoad.rows[i].status == '[NEWS]')) {
            console.log('appUser.id === responseLoad.rows[i].userId', appUser.id === responseLoad.rows[i].userId);
            const historyMessage = {
              author: (appUser.id === responseLoad.rows[i].userId) ? 'Me ' : 'Interlocutor ',
              text: responseLoad.rows[i].text,
              timestamp: responseLoad.rows[i].createdAt
            };
            this.chatMessages.push(historyMessage);
            console.log('historyMessage', historyMessage, 'this.chatMessages', this.chatMessages);
          }
        }
        this.scrollChat();
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
      this.scrollChat();
    }
  }

  /**
   * send message to chat
   * @param {string} text
   */
  public sendMessage(text: string) {
    const appUser: any = this.messageService.getUserData();
    const message: any = {
      text: this.chat.message,
      author: 'Me ',
      timestamp: new Date().toISOString()
    };
    console.log('appUser.id',message.text, appUser.id);
    this.chatMessages.push(message);
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

  /**
   * trying to scroll div to bottom
   */
  public scrollChat(): void {
    try {
      this.scrolledChat.nativeElement.scrollTop = this.scrolledChat.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
