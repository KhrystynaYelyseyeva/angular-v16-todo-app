import { MessageService } from './../../services/message.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() title = 'Error';
  message = '';
  hidden = true;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.message$.subscribe((text) => {
      this.message = text;
      this.hidden = false;
    });
  }
}
