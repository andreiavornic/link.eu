import {inject, Injectable} from '@angular/core';
import {NotificationService} from './notification-service';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {

  private notification: NotificationService = inject(NotificationService);

  async copy(text: string): Promise<void> {
    try {
      /**
       * navigator.clipboard requires a secure context (HTTPS or localhost).
       * On HTTP (e.g. S3 static hosting), we fall back to the deprecated
       * execCommand('copy') which works without HTTPS.
       */
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      this.notification.success('Copied to clipboard');
    } catch {
      this.notification.error('Failed to copy. Please try manually.');
    }
  }

}
