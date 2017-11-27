import { FormControl } from '@angular/forms';
import { error } from 'util';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
  <div *ngIf="temErro()" class="ui-message ui-messages-error">
    {{ text }}
  </div>
  `,
  styles: [`
    .ui-messages-error{
      margin: 0;
      margin-top: 4px;
      border-radius: 5px;
    }
  `]
})
export class MessageComponent {

  @Input() control: FormControl;
  @Input() error: string;
  @Input() text: string;

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
