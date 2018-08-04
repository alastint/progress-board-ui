import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../services/messageservice";

@Component({
  selector: 'app-conversationpage',
  templateUrl: './conversationpage.component.html',
  styleUrls: ['./conversationpage.component.css']
})
export class ConversationpageComponent implements OnInit {

  constructor(
    public messageService: MessageService
  ) { }

  ngOnInit() {
  }
  public loadConversation(id){

  }
}
