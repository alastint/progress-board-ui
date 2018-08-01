import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/authservice';
import {MessageService} from '../../../services/messageservice';
import {QuestionAnswerService} from "../../../services/question-answer";
import {ApiService} from "../../../services/api";

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
  public urlParamsNews = '';
  public newsBlock: any[] = [];
  public newsText = '';

  constructor(
    public authservice: AuthService,
    public messageService: MessageService,
    public questionanswer: QuestionAnswerService,
    public api: ApiService
  ) { }

  public ngOnInit() {
    this.newsBlockFunc();
  }

  public ngOnDestroy(){
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  /**
   * Showing/hiding news input tag
   */
  public openInput() {
    this.newsInputOpen = !this.newsInputOpen;
  }

  public quit() {
    this.authservice.logOutFunk();
  }

  public sendNewsFunc() {
    if (this.newsText) {
      this.sendNews(this.newsText);
    }
  }

  public answerOpenFunc(){
    this.answerOpen = true;
  }

  /**
   * Create question and send to backend
   */
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

  /**
   * load last news
   */
  public newsBlockFunc() {
    this.urlParamsNews = `?page=1&limit=2&order={"createdAt":-1}&where={"status":"[NEWS]"}`;
    this.messageService.getMessage(this.urlParamsNews).subscribe(
      (responseLoad: any) => {
        console.log('responseLoad', responseLoad);
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
      text: this.newsText,
      timestamp: new Date().toISOString()
    };
    console.log('this.newsText', newsMessage);
    this.newsBlock.push(newsMessage);
    // this.messageService.postNews(newsMessage.text, appUser.id, '[NEWS]' )
    // this.api.post(`/message`, {text: newsMessage.text, userId: appUser.id, status: '[NEWS]' })
    this.messageService.postNews(newsMessage.text, appUser.id, '[NEWS]' ).subscribe(
      (resp) => {
        console.log('resp', resp);
        this.newsInputOpen = false;
        this.newsBlockFunc();
      },
      (err) => {
        console.log('err', err)
      }
    );
    this.newsBlock = [];
    this.newsText = '';
  }
}
