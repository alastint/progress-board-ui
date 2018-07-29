import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/userservice";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css']
})
export class MentorComponent implements OnInit {
  public urlParams = '';
  public questionBoard: any[] = [];
  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    this.questionFunc()
  }
  public questionFunc() {
    this.urlParams = `?page=1&limit=8&order={"createdAt":-1}&where={"status":"enabled"}`;
    this.userService.getQAResponce(this.urlParams).subscribe(
      (resp: any) => {
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
        console.log(this.questionBoard)
      },
      (err) => {
        console.log (err);
      }
    );
  }
  public goToDetails(id) {
    this.router.navigate(['home', 'discuss', id]);
  }
}
