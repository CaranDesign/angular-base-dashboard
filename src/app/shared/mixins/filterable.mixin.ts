// shared/mixins/filterable.mixin.ts
export interface FilterState {
  activeFilters: Map<string, any>;
}

export function createFilterableMixin<T>() {
  return class Filterable {
    items: T[] = [];
    filterState: FilterState = {
      activeFilters: new Map()
    };

    setFilter(key: string, value: any): void {
      if (value === null || value === undefined) {
        this.filterState.activeFilters.delete(key);
      } else {
        this.filterState.activeFilters.set(key, value);
      }
      // reset on change filter
      this.onFilterChange();
    }

    getFilter(key: string): any {
      return this.filterState.activeFilters.get(key);
    }

    clearFilters(): void {
      this.filterState.activeFilters.clear();
      this.onFilterChange();
    }

    private onFilterChange(): void {
      // Override in subclass
      this.loadData();
    }

    loadData(): void {
      // Override in subclass
    }
  };
}