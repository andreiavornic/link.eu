import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  imports: [
    RouterLink,
    MatButton
  ],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {

}
