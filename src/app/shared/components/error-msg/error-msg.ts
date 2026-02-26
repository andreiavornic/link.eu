import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-error-msg',
  standalone: false,
  templateUrl: './error-msg.html',
  styleUrl: './error-msg.scss',
})
export class ErrorMsg {
  error = input('');
  action = output<void>();
}
