import { Subject, takeUntil } from 'rxjs';
import { MessageService } from './../../services/message.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {
  @Input() title = 'Error';
  message = '';
  hidden = true;
  destroy$$ = new Subject();

  constructor(private messageService: MessageService) {}

  ngOnDestroy(): void {
    this.destroy$$.next(null);
    this.destroy$$.complete();
  }

  ngOnInit(): void {
    this.messageService.message$
      .pipe(takeUntil(this.destroy$$))
      .subscribe((text) => {
        this.message = text;
        this.hidden = false;
      });
  }
}
