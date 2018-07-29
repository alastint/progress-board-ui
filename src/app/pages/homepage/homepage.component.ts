import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/authservice';
import {MessageService} from '../../../services/messageservice';
import {QuestionAnswerService} from "../../../services/question-answer";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  public appUser = this.messageService.getUserData();
  public userEmail: '';
  public title = '';
  public description = '';
  public question: any = { };
  public newsInputOpen = false;
  public interval: any;
  public answerOpen = false;

  constructor(
    public authservice: AuthService,
    public messageService: MessageService,
    public questionanswer: QuestionAnswerService
  ) { }

  public ngOnInit() {

    this.interval = setInterval(() => {
      this.messageService.loadChat();
    }, 300000);
    this.messageService.loadChat();
    this.messageService.newsBlockfunc();
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
