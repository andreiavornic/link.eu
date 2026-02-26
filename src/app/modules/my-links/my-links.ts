import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {MyLinksFacade} from './data-access/my-links-facade';

@Component({
  selector: 'app-my-links',
  standalone: false,
  templateUrl: './my-links.html',
  styleUrl: './my-links.scss',
})
export class MyLinks implements OnInit {
  facade = inject(MyLinksFacade);
  private router = inject(Router);

  ngOnInit(): void {
    this.facade.load();
  }

  async goToGenerator(): Promise<void> {
    await this.router.navigate(['/']);
  }
}
