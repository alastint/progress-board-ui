import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {QuestionAnswerService} from "../../../services/question-answer";

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css']
})
export class MentorComponent implements OnInit {
  public urlParams = '';
  public questionBoard: any[] = [];
  constructor(
    public questionAnswerService: QuestionAnswerService,
    public router: Router
  ) { }

  ngOnInit() {
    this.questionFunc()
  }

  /**
   * load list of questionss with status "Enabled" from backend, and try calling questionResponce function
   */
  public questionFunc() {
    this.urlParams = `?page=1&limit=8&order={"createdAt":-1}&where={"status":"enabled"}`;
    this.questionAnswerService.getQAResponce(this.urlParams).subscribe(
      (resp: any) => {
        this.questionResponse(resp)
      },
      (err) => {
        console.log (err);
      }
    );
  }

  /**
   * load list of questionss with status "Enabled" to question board
   * @param resp
   */
  public questionResponse(resp){
    for (let i = 0; i < resp.rows.length; i++) {
      if ((resp.rows[i].status === 'enabled')) {
        const questionLine = {
          author: 'someIdiot',
          title: resp.rows[i].title,
          timestamp: resp.rows[i].createdAt,
          id: i,
          status: resp.rows[i].status,
          questionId: resp.rows[i].id
        };
        this.questionBoard.push(questionLine);
      }
    }
  }

  /**
   * Redirect to  discuss question by id
   * @param id
   */
  public goToDetails(id) {
    this.router.navigate(['home', 'discuss', id]);
  }
}
