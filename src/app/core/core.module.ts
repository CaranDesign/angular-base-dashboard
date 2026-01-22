import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthService } from './services/auth.service';
import { PermissionService } from './services/permission.service';

// provide one and one only import of the module
// thoose structure below are the equivalent of states and context
// providers in React, and thei provide a single instance of the 
// modules 
const MODULES = [HttpClientModule];
const SERVICES = [AuthService, PermissionService];
const INTERCEPTORS = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];

@NgModule({
  imports: [MODULES], //all injected modules in application
  providers: [...SERVICES, ...INTERCEPTORS] //singleton providers
})
export class CoreModule {
  // assure import only once for module
  // search for the module in parent injector and skip current module
  // throw an error if a CoreModule is already injected
  
  constructor(@Optional() @SkipSelf() coreModule: CoreModule) {
    if (coreModule) {
      throw new Error('CoreModule should only be imported once in AppModule');
    }
  }
}