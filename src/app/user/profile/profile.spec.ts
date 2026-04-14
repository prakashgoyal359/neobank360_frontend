import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Profile } from './profile';
import { of } from 'rxjs';

describe('Profile Component', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profile],
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
  });

  it('should load user profile', () => {
    const mockUser = {
      email: 'test@gmail.com',
      fullName: 'Test User',
    };

    component.user = mockUser;

    fixture.detectChanges();

    expect(component.user.email).toBe('test@gmail.com');
  });

  it('should update user profile', () => {
    component.user = { fullName: 'Old Name' };

    component.user.fullName = 'New Name';

    expect(component.user.fullName).toBe('New Name');
  });
});
