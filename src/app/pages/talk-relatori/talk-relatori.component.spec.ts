import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkRelatoriComponent } from './talk-relatori.component';

describe('TalkRelatoriComponent', () => {
  let component: TalkRelatoriComponent;
  let fixture: ComponentFixture<TalkRelatoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalkRelatoriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalkRelatoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
