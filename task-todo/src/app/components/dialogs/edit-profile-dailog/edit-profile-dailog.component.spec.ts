import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileDailogComponent } from './edit-profile-dailog.component';

describe('EditProfileDailogComponent', () => {
  let component: EditProfileDailogComponent;
  let fixture: ComponentFixture<EditProfileDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileDailogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProfileDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
