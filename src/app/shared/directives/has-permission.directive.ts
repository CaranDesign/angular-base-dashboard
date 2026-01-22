// has-permission.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionKey } from '../../core/models/permission.model';
import { PermissionService } from '../../core/services/permission.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {
   
   /* 
   * Eample of usage on component
   *
   *     <button *appHasPermission="'users:delete'" > Delete User </button>
   *
   *     or multiple permissions
   *
   *      <div *appHasPermission="['users:create', 'users:update']">
   *         Create/Edit Users
   *      </div> 
   */
   
  private permissions: PermissionKey[] = [];

  constructor(
    private permissionService: PermissionService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set appHasPermission(val: PermissionKey | PermissionKey[]) {
    this.permissions = Array.isArray(val) ? val : [val];
    this.updateView();
  }

  private updateView(): void {
    // if use has all the permissions show the component
    if (this.permissionService.hasAllPermissions(this.permissions)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}