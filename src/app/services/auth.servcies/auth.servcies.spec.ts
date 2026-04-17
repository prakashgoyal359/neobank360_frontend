import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthServcies } from './auth.servcies';

describe('AuthServcies', () => {
  let component: AuthServcies;
  let fixture: ComponentFixture<AuthServcies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthServcies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthServcies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
