# Link.EU — URL Shortener

Angular 21 single-page application for generating short URLs, managing created links, and viewing per-link analytics with interactive charts.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Build](#build)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Feature Modules](#feature-modules)
- [Core Layer](#core-layer)
- [Shared Module](#shared-module)
- [Mock API](#mock-api)
- [Tech Stack & Dependencies](#tech-stack--dependencies)
- [Design System & Styling](#design-system--styling)
- [Key Architectural Decisions](#key-architectural-decisions)
- [Next To-Do](#next-to-do)

---

## Prerequisites

| Tool       | Version     |
|------------|-------------|
| **Node.js**| >= 22.x     |
| **npm**    | >= 10.9.x   |
| **Angular CLI** | 21.1.x |

---

## Installation

```bash
git clone <repository-url>
cd link.eu
npm install
```

---

## Running the Application

```bash
npm start          # or: ng serve
```

Open `http://localhost:4200/`. The app hot-reloads on file changes.

---

## Build

### Development

```bash
ng build --configuration development
```

- Source maps enabled
- No optimization
- No license extraction

### Production (default)

```bash
npm run build      # or: ng build
```

- Builder: `@angular/build:application`
- Entry point: `src/main.ts`
- Output: `dist/` directory
- Output hashing: all assets
- Bundle budgets:
  - Initial bundle: warning at 500 kB, error at 1 MB
  - Component styles: warning at 4 kB, error at 8 kB

### Watch Mode

```bash
npm run watch
```

Continuous development build that re-compiles on file changes.

---

## Running Tests

```bash
npm test           # or: ng test
```

- Test runner: **Vitest 4.x** (via `@angular/build:unit-test`)
- DOM environment: **jsdom**
- Spec config: `tsconfig.spec.json`
- Spec files follow the `*.spec.ts` convention, co-located with source files

---

## Project Structure

```
src/
├── main.ts                          # Bootstrap — standalone App via bootstrapApplication()
├── index.html                       # HTML shell
├── styles.scss                      # Global styles (Bootstrap, Material theme, CSS variables)
│
├── assets/
│   └── mock-data/
│       ├── links.json               # Seed data — 5 pre-existing links
│       └── analytics/
│           ├── link-1.json … link-5.json   # Per-link analytics fixtures
│
└── app/
    ├── app.ts                       # Root component (standalone)
    ├── app.html                     # <app-page-wrap> + <router-outlet>
    ├── app.scss
    ├── app.config.ts                # ApplicationConfig — router, HttpClient, mock interceptor
    ├── app.routes.ts                # Top-level lazy routes
    │
    ├── core/
    │   ├── http/
    │   │   └── mock-api.interceptor.ts      # HttpInterceptorFn — intercepts all /api/* calls
    │   ├── models/
    │   │   ├── link.model.ts                # Link, LinkId
    │   │   ├── link-generation.model.ts     # GenerateLinkRequest, GenerateLinkResponse
    │   │   ├── api-response.model.ts        # ApiResponse<T>
    │   │   ├── analytics.model.ts           # Analytics (trend, devices, sources, visitors)
    │   │   └── notification.model.ts        # Notification
    │   ├── services/
    │   │   ├── notification-service.ts      # Signal-based toast notification service
    │   │   └── clipboard-service.ts         # Clipboard API wrapper with notifications
    │   └── util/
    │       └── validators.ts                # urlValidator (reactive forms), normalizeUrl()
    │
    ├── shared/
    │   ├── shared-module.ts                 # NgModule — re-exports Material, Bootstrap, chart deps
    │   └── components/
    │       ├── page-wrap/                   # App shell — top-nav + toast container + <ng-content>
    │       ├── top-nav/                     # Navigation bar with routerLink: Generator, My Links
    │       └── error-msg/                   # Reusable error display with "Try again" button
    │
    ├── not-found/                           # 404 wildcard route component (standalone)
    │
    └── modules/
        ├── home/                            # Feature: URL Shortener (lazy-loaded)
        │   ├── home-module.ts
        │   ├── home-routing-module.ts       # Route: ''
        │   ├── home.ts / home.html
        │   ├── data-access/
        │   │   ├── link-generator.ts        # HTTP service — POST /api/links
        │   │   └── link-generator.facade.ts # State facade (signal-based)
        │   └── components/
        │       ├── url-form/                # URL input form with validation
        │       └── result-card/             # Result display + copy + email opt-in
        │
        └── my-links/                        # Feature: Link Management & Analytics (lazy-loaded)
            ├── my-links-module.ts           # Declares all components, provides Chart.js
            ├── my-links-routing-module.ts   # Routes: '' (list), ':id' (analytics)
            ├── my-links.ts / my-links.html
            ├── link-analytics/              # Analytics detail page (route param :id)
            ├── data-access/
            │   ├── my-links-service.ts      # HTTP service — GET /api/links
            │   ├── my-links-facade.ts       # State facade — links list
            │   ├── analytics-service.ts     # HTTP service — GET /api/my-links/:id/analytics
            │   └── analytics-facade.ts      # State facade — analytics data
            └── components/
                ├── empty-state/             # "No links yet" placeholder
                ├── links-table/             # Material table with paginator + copy action
                ├── kpi-cards/               # KPI summary cards (total clicks, visitors)
                ├── trend-chart/             # Line chart — clicks over 7 days
                ├── device-chart/            # Doughnut chart — Mobile vs Desktop
                ├── sources-chart/           # Bar chart — Direct, Social, Email, Referral
                └── visitors-chart/          # Doughnut chart — Unique vs Returning
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   App (standalone)                   │
│              bootstrapApplication(App)               │
│    providers: Router, HttpClient, MockInterceptor    │
├─────────────────────────────────────────────────────┤
│                  SharedModule (NgModule)             │
│  PageWrap · TopNav · ErrorMsg                       │
│  Re-exports: Material, ReactiveFormsModule,         │
│              BaseChartDirective, RouterModule        │
├──────────────────┬──────────────────────────────────┤
│  HomeModule      │  MyLinksModule                   │
│  (lazy-loaded)   │  (lazy-loaded)                   │
│  Route: /        │  Routes: /my-links, /my-links/:id│
├──────────────────┴──────────────────────────────────┤
│                     Core Layer                       │
│  Models · Services · HTTP Interceptor · Validators   │
└─────────────────────────────────────────────────────┘
```

**Pattern: Service + Facade**
Each feature uses a two-layer data-access pattern:
- **Service** — thin HTTP wrapper (`HttpClient` calls, returns `Observable`)
- **Facade** — manages UI state via Angular `signal()` / `computed()`, exposes read-only signals to components

---

## Feature Modules

### Home Module (`/`)

URL shortener form. User pastes a long URL, clicks "Shorten URL", and receives a `https://exlnk.co/...` short link.

| Component      | Purpose                                                |
|----------------|--------------------------------------------------------|
| `Home`         | Page container — wires facade to child components      |
| `UrlForm`      | Reactive form with custom `urlValidator`, submit logic |
| `ResultCard`   | Displays short URL, copy-to-clipboard, email opt-in    |

Data access: `LinkGenerator` (service) + `LinkGeneratorFacade` (state)

### My Links Module (`/my-links`)

Displays all generated links in a paginated Material table. Each row links to a per-link analytics detail page.

| Component        | Purpose                                              |
|------------------|------------------------------------------------------|
| `MyLinks`        | Page — loads links on init, empty/loading/error states |
| `LinksTable`     | `MatTable` + `MatPaginator` with copy action          |
| `EmptyState`     | Placeholder when no links exist                       |
| `LinkAnalytics`  | Analytics detail page — route param `:id`             |
| `KpiCards`       | Summary KPI cards                                     |
| `TrendChart`     | Line chart (Chart.js) — 7-day click trend             |
| `DeviceChart`    | Doughnut chart — Mobile vs Desktop split              |
| `SourcesChart`   | Bar chart — traffic sources                           |
| `VisitorsChart`  | Doughnut chart — unique vs returning visitors          |

Data access: `MyLinksService` + `MyLinksFacade`, `AnalyticsService` + `AnalyticsFacade`

---

## Core Layer

### Models (`core/models/`)

| Model                    | Description                                    |
|--------------------------|------------------------------------------------|
| `Link`                   | `id`, `originalUrl`, `shortUrl`, `createdAt`, `email?` |
| `ApiResponse<T>`         | Generic wrapper: `{ data: T, success, message? }` |
| `GenerateLinkRequest`    | `{ originalUrl, email? }`                      |
| `GenerateLinkResponse`   | `{ link: Link }`                               |
| `Analytics`              | `totalClicks`, `trend[]`, `devices[]`, `sources[]`, `visitors` |
| `Notification`           | `{ id, message, type: 'success'|'error'|'info' }` |

### Services (`core/services/`)

| Service              | Description                                               |
|----------------------|-----------------------------------------------------------|
| `NotificationService`| Signal-based toast queue — auto-dismiss after 3.5 s       |
| `ClipboardService`   | `navigator.clipboard.writeText()` with success/error toasts |

### Utilities (`core/util/`)

| Utility        | Description                                               |
|----------------|-----------------------------------------------------------|
| `urlValidator`  | Angular `ValidatorFn` — validates URL with hostname check |
| `normalizeUrl`  | Ensures URL starts with `https://`                        |

---

## Shared Module

`SharedModule` (NgModule) bundles and re-exports common dependencies used by both feature modules:

- **Angular Material**: `MatInputModule`, `MatButton`, `MatCardModule`, `MatProgressBarModule`, `MatTableModule`, `MatPaginatorModule`
- **Forms**: `ReactiveFormsModule`
- **Charts**: `BaseChartDirective` (ng2-charts)
- **Router**: `RouterModule`
- **Common**: `CommonModule`
- **Components**: `TopNav`, `PageWrap`, `ErrorMsg`

---

## Mock API

The application runs entirely client-side with **no real backend**. An `HttpInterceptorFn` (`mock-api.interceptor.ts`) intercepts all `/api/*` requests and returns mock responses.

| Endpoint                          | Method | Description                      |
|-----------------------------------|--------|----------------------------------|
| `/api/links`                      | POST   | Generate a new short link        |
| `/api/links`                      | GET    | List all links                   |
| `/api/my-links/:id/analytics`    | GET    | Analytics for a specific link    |

**Behavior**:
- Seed data loaded from `assets/mock-data/links.json`
- Links persisted in `localStorage` (key: `exlink_links`)
- 5% random failure rate (`shouldFail()`) to simulate server errors
- Response delay: 600–1200 ms (simulates network latency)
- Dynamically created links get randomly generated analytics

---

## Tech Stack & Dependencies

### Runtime

| Package               | Version | Purpose                                 |
|-----------------------|---------|-----------------------------------------|
| `@angular/core`       | ^21.1.0 | Angular framework                       |
| `@angular/router`     | ^21.1.0 | Client-side routing with lazy loading   |
| `@angular/forms`      | ^21.1.0 | Reactive forms                          |
| `@angular/common`     | ^21.1.0 | Common directives, pipes                |
| `@angular/material`   | ~21.2.0 | Material Design components              |
| `@angular/cdk`        | ~21.2.0 | Component Dev Kit (Material dependency) |
| `bootstrap`           | ^5.3.8  | Grid system, utility classes            |
| `chart.js`            | ^4.5.1  | Chart rendering engine                  |
| `ng2-charts`          | ^8.0.0  | Angular bindings for Chart.js           |
| `rxjs`                | ~7.8.0  | Reactive programming                    |
| `tslib`               | ^2.3.0  | TypeScript runtime helpers              |

### Development

| Package                  | Version  | Purpose                              |
|--------------------------|----------|--------------------------------------|
| `@angular/cli`           | ^21.1.5  | CLI tooling                          |
| `@angular/build`         | ^21.1.5  | Application builder                  |
| `@angular/compiler-cli`  | ^21.1.0  | AOT compiler                         |
| `typescript`             | ~5.9.2   | TypeScript compiler                  |
| `vitest`                 | ^4.0.8   | Unit test runner                     |
| `jsdom`                  | ^27.1.0  | DOM environment for tests            |
| `postcss`                | ^8.5.3   | CSS post-processing                  |

---

## Design System & Styling

The application combines the following styling approaches:

1. **Bootstrap 5** — grid system (`container`, `row`, `col-*`), utility classes (`d-flex`, `gap-3`, `pt-5`, etc.), JS bundle included in `angular.json` scripts
2. **Angular Material** — theme configured in `styles.scss` using `mat.theme()` with `azure` primary palette, `Roboto` font, density 0
3. **Custom CSS Variables** — defined in `:root` for colors, spacing, radius, shadows, transitions, and typography (see `styles.scss`)

Fonts loaded from Google Fonts: **Roboto** (300, 400, 500) + **Material Icons**.

---

## Key Architectural Decisions

| Decision                      | Rationale                                                                 |
|-------------------------------|---------------------------------------------------------------------------|
| **Standalone root + NgModule features** | Root `App` bootstrapped standalone; feature modules use NgModule for grouping related declarations |
| **Lazy-loaded feature modules** | `loadChildren()` in routes — reduces initial bundle size                |
| **Service + Facade pattern**   | Separates HTTP concerns (service) from UI state management (facade with signals) |
| **Angular Signals for state**  | `signal()` / `computed()` for reactive state — no external store library |
| **Mock HTTP interceptor**      | Full API simulation in the browser — no backend dependency               |
| **localStorage persistence**   | Links survive page reload via `localStorage`                             |
| **Vitest over Karma/Jasmine**  | Modern, faster test runner with native ESM support                       |
| **Strict TypeScript**          | `strict: true`, `noImplicitReturns`, `strictTemplates` — maximum type safety |
| **Component Input Binding**    | `withComponentInputBinding()` — route params bound directly via `input.required()` |
| **SCSS component styles**      | Configured via schematics: `@schematics/angular:component.style: scss`  |
