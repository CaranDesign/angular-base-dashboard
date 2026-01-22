import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsMatrixComponent } from './permissions-matrix.component';

describe('PermissionsMatrixComponent', () => {
  let component: PermissionsMatrixComponent;
  let fixture: ComponentFixture<PermissionsMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionsMatrixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionsMatrixComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
