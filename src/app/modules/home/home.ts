import {Component, inject} from '@angular/core';
import {LinkGeneratorFacade} from './data-access/link-generator.facade';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  facade = inject(LinkGeneratorFacade);
}

