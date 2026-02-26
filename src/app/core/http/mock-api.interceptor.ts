import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of, throwError } from 'rxjs';

import linksData from '../../../assets/mock-data/links.json';
import analyticsLink1 from '../../../assets/mock-data/analytics/link-1.json';
import analyticsLink2 from '../../../assets/mock-data/analytics/link-2.json';
import analyticsLink3 from '../../../assets/mock-data/analytics/link-3.json';
import analyticsLink4 from '../../../assets/mock-data/analytics/link-4.json';
import analyticsLink5 from '../../../assets/mock-data/analytics/link-5.json';
import {Link} from '../models/link.model';
import {normalizeUrl} from '../util/validators';



const STORED_LINKS_KEY = 'exlink_links';

function getStoredLinks(): Link[] {
  const stored = localStorage.getItem(STORED_LINKS_KEY);
  return stored ? JSON.parse(stored) : [...linksData];
}

function saveLinks(links: Link[]): void {
  localStorage.setItem(STORED_LINKS_KEY, JSON.stringify(links));
}

const analyticsMap: Record<string, unknown> = {
  'link-1': analyticsLink1,
  'link-2': analyticsLink2,
  'link-3': analyticsLink3,
  'link-4': analyticsLink4,
  'link-5': analyticsLink5,
};

function generateId(): string {
  return 'link-' + Math.random().toString(36).substring(2, 8);
}

function generateShortCode(): string {
  return Math.random().toString(36).substring(2, 8);
}

function randomDelay(): number {
  return 600 + Math.random() * 600;
}

function shouldFail(): boolean {
  return Math.random() < 0.05;
}

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;

  // POST /api/links — generate short link
  if (req.method === 'POST' && url.endsWith('/api/links')) {
    if (shouldFail()) {
      return throwError(() => new Error('Server error')).pipe(delay(randomDelay()));
    }

    const body = req.body as { originalUrl: string; email?: string };

    const newLink: Link = {
      id: generateId(),
      originalUrl: body.originalUrl,
      shortUrl: normalizeUrl(`https://exlnk.co/${generateShortCode()}`),
      createdAt: new Date().toISOString(),
      email: body.email || undefined,
    };

    const links = getStoredLinks();
    links.unshift(newLink);
    saveLinks(links);

    return of(new HttpResponse({
      status: 201,
      body: { data: { link: newLink }, success: true },
    })).pipe(delay(randomDelay()));
  }

  // GET /api/links — list all links
  if (req.method === 'GET' && url.endsWith('/api/links')) {
    if (shouldFail()) {
      return throwError(() => new Error('Server error')).pipe(delay(randomDelay()));
    }

    return of(new HttpResponse({
      status: 200,
      body: { data: getStoredLinks(), success: true },
    })).pipe(delay(randomDelay()));
  }

  // GET /api/links/:id/analytics
  const analyticsMatch = url.match(/\/api\/my-links\/([^/]+)\/analytics/);
  if (req.method === 'GET' && analyticsMatch) {
    if (shouldFail()) {
      return throwError(() => new Error('Server error')).pipe(delay(randomDelay()));
    }

    const linkId = analyticsMatch[1];
    const data = analyticsMap[linkId];

    if (data) {
      return of(new HttpResponse({
        status: 200,
        body: { data, success: true },
      })).pipe(delay(randomDelay()));
    }

    // Generate random analytics for dynamically created links
    const generated = {
      linkId,
      totalClicks: Math.floor(Math.random() * 500) + 50,
      trend: Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return {
          date: d.toISOString().split('T')[0],
          clicks: Math.floor(Math.random() * 80) + 10,
        };
      }),
      devices: [
        { type: 'Mobile' as const, value: Math.floor(Math.random() * 40) + 30 },
        { type: 'Desktop' as const, value: Math.floor(Math.random() * 40) + 30 },
      ],
      sources: [
        { source: 'Direct', value: Math.floor(Math.random() * 200) + 50 },
        { source: 'Social', value: Math.floor(Math.random() * 150) + 30 },
        { source: 'Email', value: Math.floor(Math.random() * 100) + 20 },
        { source: 'Referral', value: Math.floor(Math.random() * 80) + 10 },
      ],
      visitors: {
        unique: Math.floor(Math.random() * 300) + 50,
        returning: Math.floor(Math.random() * 100) + 10,
      },
    };

    return of(new HttpResponse({
      status: 200,
      body: { data: generated, success: true },
    })).pipe(delay(randomDelay()));
  }

  return next(req);
};
