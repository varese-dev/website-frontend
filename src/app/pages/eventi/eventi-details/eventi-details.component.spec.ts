import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventiDetailsComponent } from './eventi-details.component';

describe('EventiDetailsComponent', () => {
  let component: EventiDetailsComponent;
  let fixture: ComponentFixture<EventiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventiDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
