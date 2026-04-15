import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Customer_Dashboard } from './customer_dashboard';

describe('CustomerDashboard', () => {
  let component: Customer_Dashboard;
  let fixture: ComponentFixture<Customer_Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Customer_Dashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Customer_Dashboard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
