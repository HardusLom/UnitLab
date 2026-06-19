import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConversionService } from './services/conversion.service';

interface NavItem { path: string; label: string; icon: string; }
interface SearchResult {
  quantityId: string;
  quantityName: string;
  unitId: string;
  unitName: string;
  unitSym: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly currentYear = new Date().getFullYear();
  readonly menuOpen = signal(false);
  readonly searchTerm = signal('');

  private readonly conversionService = inject(ConversionService);
  private readonly router = inject(Router);

  private readonly allUnits: SearchResult[] = this.conversionService.quantities.flatMap((q) =>
    q.units.map((u) => ({
      quantityId: q.id,
      quantityName: q.name,
      unitId: u.id,
      unitName: u.name,
      unitSym: u.symbol,
    }))
  );

  readonly activeIndex = signal(-1);

  constructor() {
    effect(() => {
      this.searchTerm();
      this.activeIndex.set(-1);
    }, { allowSignalWrites: true });
  }

  readonly searchResults = computed<SearchResult[]>(() => {
    const q = this.searchTerm().trim().toLowerCase();
    if (!q) return [];
    return this.allUnits
      .filter(
        (r) =>
          r.unitName.toLowerCase().includes(q) ||
          r.unitSym.toLowerCase().includes(q) ||
          r.quantityName.toLowerCase().includes(q)
      )
      .slice(0, 8);
  });

  selectResult(r: SearchResult): void {
    this.router.navigate(['/converter'], { queryParams: { q: r.quantityId, from: r.unitId } });
    this.searchTerm.set('');
    this.activeIndex.set(-1);
    this.menuOpen.set(false);
  }

  onSearchKey(event: KeyboardEvent): void {
    const results = this.searchResults();
    const idx = this.activeIndex();

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex.set(Math.min(idx + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex.set(Math.max(idx - 1, -1));
    } else if (event.key === 'Enter' && idx >= 0) {
      event.preventDefault();
      this.selectResult(results[idx]);
    } else if (event.key === 'Escape') {
      this.searchTerm.set('');
      this.activeIndex.set(-1);
    }
  }

  onSearchBlur(): void {
    setTimeout(() => {
      this.searchTerm.set('');
      this.activeIndex.set(-1);
    }, 150);
  }

  readonly nav: NavItem[] = [
    { path: 'reference', label: 'Reference', icon: '☰' },
    { path: 'converter', label: 'Converter', icon: '⇄' },
    { path: 'prefixes', label: 'Prefixes', icon: '×10ⁿ' },
    { path: 'formulas', label: 'Formulas', icon: 'ƒ' },
    { path: 'quiz', label: 'Quiz', icon: '?' },
    { path: 'saved', label: 'Saved', icon: '★' },
  ];
}
