import {Component, inject, signal} from '@angular/core';
import {LinkGeneratorFacade} from '../../data-access/link-generator.facade';
import {ClipboardService} from '../../../../core/services/clipboard-service';
import {NotificationService} from '../../../../core/services/notification-service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-result-card',
  standalone: false,
  templateUrl: './result-card.html',
  styleUrl: './result-card.scss',
})
export class ResultCard {
  facade = inject(LinkGeneratorFacade);

  private formBuilder: FormBuilder = inject(FormBuilder);
  private clipboard = inject(ClipboardService);
  private notification = inject(NotificationService);


  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  email = signal<string>('');
  copied = signal<boolean>(false);

  copyLink(): void {
    const url = this.facade.result()?.shortUrl;

    if (url) {
      this.clipboard.copy(url).then(() => {
        this.copied.set(true);
        setTimeout(() => setTimeout(() => this.copied.set(false), 2000))
      }).catch(()=> {
        this.copied.set(false);
      })
    }
  }

  onSubmit(): void {
    this.notification.success('Email saved! You\'ll receive click statistics.');
    this.email.set('');
  }
}
