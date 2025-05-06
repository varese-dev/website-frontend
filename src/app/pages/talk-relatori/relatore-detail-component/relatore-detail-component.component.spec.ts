import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoreDetailComponent } from './relatore-detail-component.component';

describe('RelatoreDetailComponentComponent', () => {
  let component: RelatoreDetailComponent;
  let fixture: ComponentFixture<RelatoreDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatoreDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
