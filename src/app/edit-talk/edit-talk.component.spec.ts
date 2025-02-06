import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTalkComponent } from './edit-talk.component';

describe('EditTalkComponent', () => {
  let component: EditTalkComponent;
  let fixture: ComponentFixture<EditTalkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTalkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
