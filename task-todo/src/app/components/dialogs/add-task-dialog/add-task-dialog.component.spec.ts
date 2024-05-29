import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtaskDialogComponent } from './add-task-dialog.component';

describe('AddtaskDialogComponent', () => {
  let component: AddtaskDialogComponent;
  let fixture: ComponentFixture<AddtaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtaskDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddtaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
