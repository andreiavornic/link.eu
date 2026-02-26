import {Component, inject, output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {urlValidator} from '../../../../core/util/validators';
import {LinkGeneratorFacade} from '../../data-access/link-generator.facade';

@Component({
  selector: 'app-url-form',
  standalone: false,
  templateUrl: './url-form.html',
  styleUrl: './url-form.scss',
})
export class UrlForm {
  facade: LinkGeneratorFacade = inject(LinkGeneratorFacade);
  private formBuilder: FormBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    url: ['', [Validators.required, urlValidator]],
  });

  submitted = output<string>();


  onSubmit(): void {
    if (this.form.invalid) return;
    const url = this.form.value.url!.trim();
    const normalized = url.startsWith('http') ? url : `https://${url}`;
    this.facade.generate(normalized);
    this.submitted.emit(normalized);
  }
}
