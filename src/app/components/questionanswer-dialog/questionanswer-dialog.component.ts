import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-questionanswer-dialog',
  templateUrl: './questionanswer-dialog.component.html',
  styleUrls: ['./questionanswer-dialog.component.css']
})
export class QuestionanswerDialogComponent implements OnInit {
  public user: any = {};
  public passwordConfirm = {};
  @Input() options: any = {
    answerOpen: false,
    send: false,
    cancel: false,
  };
  @Input() targetItem: any = {};
  @Output() doConfirm: any = new EventEmitter();
  @Output() doReject: any = new EventEmitter();
  public answerOpen = false;

  constructor(
    public router: Router,
  ) { }

  public ngOnInit() {
    setTimeout(() => this.answerOpen = this.options.answerOpen, 50);
  }

  public do(action: string) {
    this.answerOpen = false;
    setTimeout(() => {
      switch (action) {
        case 'confirm':
          this.doConfirm.next(this.targetItem);
          break;
        default:
          this.doReject.next();
          break;
      }
    }, 200);
  }
}
