import {AfterViewInit, Component, inject, input, OnInit, ViewChild,} from '@angular/core';
import {Link} from '../../../../core/models/link.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ClipboardService} from '../../../../core/services/clipboard-service';

@Component({
  selector: 'app-links-table',
  standalone: false,
  templateUrl: './links-table.html',
  styleUrl: './links-table.scss',
})
export class LinksTable implements OnInit, AfterViewInit {
  links = input.required<Link[]>();
  private clipboard = inject(ClipboardService);

  displayedColumns: string[] = ['originalUrl', 'shortUrl', 'createdAt', 'action'];
  dataSource!: MatTableDataSource<Link>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Link>(this.links());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  copy(url: string): void {
    this.clipboard.copy(url);
  }
}
