import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/authservice';
import {MessageService} from '../../../services/messageservice';
import {QuestionAnswerService} from "../../../services/question-answer";
import {ChatComponentComponent} from "../../components/chat-component/chat-component.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent  implements OnInit, OnDestroy{
  public appUser = this.messageService.getUserData();
  public title = '';
  public description = '';
  public question: any = { };
  public newsInputOpen = false;
  public answerOpen = false;
  public interval: any;
  public userEmail = '';

  constructor(
    public authservice: AuthService,
    public messageService: MessageService,
    public questionanswer: QuestionAnswerService,
    public chatComponent: ChatComponentComponent
  ) { }

  public ngOnInit() {
    this.interval = setInterval(() => {
      this.chatComponent.loadChat();
    }, 300000);
    this.chatComponent.loadChat();
    this.chatComponent.newsBlockfunc();
  }
  public ngOnDestroy(){
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  public openInput() {
    this.newsInputOpen = !this.newsInputOpen;
  }
  public quit() {
    this.authservice.logOutFunk();
  }

  public sendNewsFunc() {
    if (this.chatComponent.chat.newsMessage) {
      this.chatComponent.sendNews(this.chatComponent.chat.newsMessage);
    }
  }
  public answerOpenFunc(){
    this.answerOpen = true;
  }
  public sendMessage() {
    this.question = {
      title: this.title,
      description: this.description
    };
    console.log('send clicked');
    if( this.question.title == '' || this.question.description == '') {
      return console.log('something wrong', 'question.title', this.question.title, 'question.description', this.question.description )
    } else {
      this.questionanswer.createNewQuestion(this.question);
      this.answerOpen = false;
    }
  }
  public reject() {
    console.log('reject clicked');
    this.answerOpen = false;
  }
}
