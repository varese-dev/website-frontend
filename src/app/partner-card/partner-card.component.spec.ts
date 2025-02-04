import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerCardComponent } from '../../app/partner-card/partner-card.component';

describe('PartnerComponent', () => {
  let component: PartnerCardComponent;
  let fixture: ComponentFixture<PartnerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
