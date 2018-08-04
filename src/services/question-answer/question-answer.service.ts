import { Injectable } from "@angular/core";
import {ApiService} from "../api";
import {Observable} from "rxjs/index";
import {HttpResponse} from "@angular/common/http";

@Injectable()

export class QuestionAnswerService {
  protected questionAnswerPath = '/question_answer';
  public newAnswer: any = { title: '', description: ''};

  constructor(
    public api: ApiService,
  ) {}

  /**
   * send request to create a question for all user roles who can reply
   * @param question
   * @returns {Subscription}
   */
  public createNewQuestion(question: any) {
    return this.api.post(`${this.questionAnswerPath}/ask`, {title: question.title, description: question.description})
  }

  /**
   * Send text answer for particular question id
   * @param {number} id
   * @returns {Observable<HttpEvent<any>>}
   */
  public createAnswerForCurrentQuestion(id: number){
    console.log(id);
    return this.api.post(`${this.questionAnswerPath}/${id}/reply`, {title: this.newAnswer.title, description: this.newAnswer.description})
  }

  public getAskDetail(id: number) {
    const params: string = `?include=["question","answers","user"]&where={"id":${id}}`;
    return this.getQAResponceById( id, params);
  }

  /**
   * request list of questions with titles and number of answers
   * @param {string} params
   * @returns {Observable<HttpResponse<any>>}
   */
  public getQAResponce(params:string): Observable<HttpResponse<any>> {
    return this.api.get(`${this.questionAnswerPath}${params || ''}`);
  }

  /**
   * request question by id  with all details with include all detail about user who created the question
   * and all answers for it
   * @param {number} id
   * @param {string} params
   * @returns {Observable<HttpResponse<any>>}
   */
  public getQAResponceById(id: number, params:string): Observable<HttpResponse<any>> {
    return this.api.get(`${this.questionAnswerPath}/${id}${params || ''}`);
  }
}
