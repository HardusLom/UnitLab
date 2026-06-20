import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';

interface TocItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-manual',
  standalone: true,
  imports: [],
  templateUrl: './manual.component.html',
  styleUrl: './manual.component.css',
})
export class ManualComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('section') sections!: QueryList<ElementRef<HTMLElement>>;

  readonly activeId = signal('overview');

  readonly toc: TocItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'getting-started', label: 'Getting started' },
    { id: 'navigation', label: 'Navigation & search' },
    { id: 'reference', label: 'Reference table' },
    { id: 'converter', label: 'Converter' },
    { id: 'prefixes', label: 'SI prefixes' },
    { id: 'formulas', label: 'Formulas' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'saved', label: 'Saved' },
    { id: 'tips', label: 'Tips & shortcuts' },
    { id: 'install', label: 'Install as an app' },
    { id: 'faq', label: 'FAQ' },
  ];

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeId.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    this.sections.forEach((s) => this.observer!.observe(s.nativeElement));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scrollTo(event: Event, id: string): void {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeId.set(id);
    }
  }
}
