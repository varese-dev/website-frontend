import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoreDetailComponentComponent } from './relatore-detail-component.component';

describe('RelatoreDetailComponentComponent', () => {
  let component: RelatoreDetailComponentComponent;
  let fixture: ComponentFixture<RelatoreDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatoreDetailComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatoreDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
