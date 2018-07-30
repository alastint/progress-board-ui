import { AfterViewChecked, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { QuestionAnswerService } from "../../../services/question-answer";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-question-discuss',
  templateUrl: './question-discuss.component.html',
  styleUrls: ['./question-discuss.component.css']
})

export class QuestionDiscussComponent implements OnInit, AfterViewChecked {
  @ViewChild('answersContainer') public scrolledContainer: ElementRef;
  public options: any = {
    question: {},
    title: '',
    description: '',
    author: '',
    date: '',
    answers: [],
    id: 0
  };

  constructor(
    public questionService: QuestionAnswerService,
    public route: ActivatedRoute,
  ) { }

  public ngOnInit() {
    // Parse url param with id of required question and request details for displaying on UI
    this.route.params.subscribe((param: any) => {
      if (param['id']) {
        this.loadQuestion(param['id'])
      }
    });
  }

  public ngAfterViewChecked() {
    this.scrollToBottom();
  }

  public loadQuestion(id: number) {
      if(id){
        this.options.id = id;
        const params: string = `?include=["question","answers","user"]`;
        this.questionService.getQAResponceById(id, params).subscribe(
          (resp: any) => {
            console.log('resp', resp);
            if (resp && resp.data && resp.data.user && resp.data.question) {
              this.options.title = resp.data.question.title;
              this.options.description = resp.data.question.description;
              this.options.author = resp.data.user.fullname;
              this.options.date = resp.data.createdAt;
              this.insertAnswersForCurrentQuestion(resp.data.answers);
            }
          },
          (err: any) => {
            console.log('err', err);
          }
        )
      }
  }

  /**
   * Iterate trough answers and add only missing/new items to existing list
   * @param answerArray
   */
  public insertAnswersForCurrentQuestion(answerArray: any[]){
    for(let i = 0; i < answerArray.length; i++) {
      if (this.options.answers.indexOf(answerArray[i]) === -1) {
        this.options.answers.push(answerArray[i])
      }
    }
    this.scrollToBottom();
  }

  public sendAnswer() {
    const questionId: number = this.options.id;
    if (this.questionService.newAnswer.description !== '' && this.questionService.newAnswer.title !== '') {
      this.questionService.createAnswerForCurrentQuestion(questionId).subscribe(
        (resp: any) => {
          console.log('resp', resp);
          this.questionService.newAnswer.description = '';
          this.questionService.newAnswer.title = '';
          this.loadQuestion(questionId);
        },
        (err: any) => { console.log('err: ', err); }
      );
    } else {
      return console.log('error')
    }
  }

  public scrollToBottom(): void {
    try {
      this.scrolledContainer.nativeElement.scrollTop = this.scrolledContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
