import {Component, inject} from '@angular/core';
import {NotificationService} from '../../../core/services/notification-service';

@Component({
  selector: 'app-page-wrap',
  standalone: false,
  templateUrl: './page-wrap.html',
  styleUrl: './page-wrap.scss',
})
export class PageWrap {
  notifications = inject(NotificationService);
}
