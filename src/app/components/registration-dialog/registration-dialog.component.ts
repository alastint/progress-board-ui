import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent implements OnInit {
  public user: any = {};
  @Input() options: any = {
    isOpen: false,
    title: '',
    message: '',
    confirm: false,
    reject: false
  };
  @Input() targetItem: any = {};
  @Output() doConfirm: any = new EventEmitter();
  @Output() doReject: any = new EventEmitter();
  public isOpen = false;

  constructor() { }

  public ngOnInit() {
    setTimeout(() => this.isOpen = this.options.isOpen, 50);
  }

  public do(action: string) {
    this.isOpen = false;
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
