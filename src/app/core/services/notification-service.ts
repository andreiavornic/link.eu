import {Injectable, signal} from '@angular/core';
import {Notification} from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private counter = 0;

  readonly notifications = signal<Notification[]>([]);

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  dismiss(id: number): void {
    this.notifications.update(list => list.filter(n => n.id !== id));
  }

  private show(message: string, type: Notification['type']): void {
    const id = ++this.counter;
    this.notifications.update(list => [...list, { id, message, type }]);
    setTimeout(() => this.dismiss(id), 3500);
  }
}
