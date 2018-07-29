import { Component, OnInit } from '@angular/core';
import {QuestionAnswerService} from "../../../services/question-answer";
import {Observable} from "rxjs/index";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-question-discuss',
  templateUrl: './question-discuss.component.html',
  styleUrls: ['./question-discuss.component.css']
})
export class QuestionDiscussComponent implements OnInit {
  public question = {};
  public title = '';
  public description = '';
  public author = '';
  public date = '';
  public answers: any [] = [];
  public id = 0;
  public answersObject = {};

  constructor(
    public questionService: QuestionAnswerService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((param: any) => {
      if (param['id']) {
        this.loadQuestion(param['id'])
      }
    });
  }

  public loadQuestion(id: number) {
      if(id){
        this.id = id;
        this.questionService.getAskDetail(id).subscribe(
          (resp: any) => {
            console.log('resp', resp);
            this.title = resp.rows[0].question.title;
            this.description = resp.rows[0].question.description;
            this.author = resp.rows[0].user.fullname;
            this.date = resp.rows[0].createdAt;
            this.answersObject = resp.rows[0].answers;
            this.getAnswersForCurrentQuestion(this.answersObject)
          },
          (err: any) => {
            console.log('err', err);
          }
        )
      }
  }
  public getAnswersForCurrentQuestion(answerArray){
    for(let i = 0; i < answerArray.length; i++) {
      this.answers.push(answerArray[i])
    }
  }
  public sendAnswer() {
    const thisId = this.id;
    console.log(thisId);
    if (this.questionService.newAnswer.description != '' && this.questionService.newAnswer.title !== '') {
      this.questionService.createAnswerFOrCurrentQuestion(thisId);
      this.answers = [];
      this.loadQuestion(thisId);
    } else {
      return console.log('error')
    }
  }


}
