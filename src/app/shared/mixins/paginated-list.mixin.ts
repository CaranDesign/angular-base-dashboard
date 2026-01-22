// shared/mixins/paginated-list.mixin.ts
export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export function createPaginatedListMixin<T>() {
   
      /*
      * Example of usage:
      *
      * @Component({...})
      * export class UserListComponent extends createPaginatedListMixin<User>() {
      *   constructor(private userService: UserService) {
      *     super();
      *   }
      *
      *   ngOnInit(): void {
      *     this.loadData();
      *   }
      *
      *   loadData(): void {
      *     this.userService
      *       .getUsers(this.pagination.page, this.pagination.pageSize)
      *       .subscribe(response => {
      *         this.items = response.data;
      *         this.pagination.total = response.total;
      *       });
      *   }
      * }
      */

   
  return class PaginatedList {
    items: T[] = [];
    pagination: PaginationState = {
      page: 1,
      pageSize: 10,
      total: 0
    };

    goToPage(page: number): void {
      this.pagination.page = Math.max(1, page);
      this.loadData();
    }

    nextPage(): void {
      this.goToPage(this.pagination.page + 1);
    }

    prevPage(): void {
      this.goToPage(this.pagination.page - 1);
    }

    changePageSize(size: number): void {
      this.pagination.pageSize = size;
      this.pagination.page = 1; // Reset to first page
      this.loadData();
    }

    get totalPages(): number {
      return Math.ceil(this.pagination.total / this.pagination.pageSize);
    }

    get hasNextPage(): boolean {
      return this.pagination.page < this.totalPages;
    }

    get hasPrevPage(): boolean {
      return this.pagination.page > 1;
    }

    loadData(): void {
       // Override in subclass
       // check the example above for use it properly
    }
  };
}