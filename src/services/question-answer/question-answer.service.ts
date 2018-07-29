import { Injectable } from "@angular/core";
import {ApiService} from "../api";
import {UserService} from "../userservice";

@Injectable()

export class QuestionAnswerService {
  protected questionAnswerPath = '/question_answer';
  public newAnswer: any = { title: '', description: ''};

  constructor(
    public api: ApiService,
    public userservice: UserService
  ) {}

  public createNewQuestion(question: any) {
    return this.api.post(`${this.questionAnswerPath}/ask`, {title: question.title, description: question.description}).subscribe(
      (resp: any) => {
        console.log('resp', resp);
      },
      (err) => {
        console.log (err);
      }
    );
  }

  public createAnswerFOrCurrentQuestion(id: number){
    console.log(id);
    return this.api.post(`${this.questionAnswerPath}/${id}/reply`, {title: this.newAnswer.title, description: this.newAnswer.description}).subscribe(
      (resp: any) => {
        console.log('success', resp);
      },
      (err) => {
        console.log (err);
      }
    );
  }

  public getAskDetail(id: number) {
    const params: string = `?include=["question","answers","user"]&where={"id":${id}}`;
    return this.userservice.getQAResponce(params);
  }
}
