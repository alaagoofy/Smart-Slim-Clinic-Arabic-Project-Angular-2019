import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsCPComponent } from './doctorsCP.component';

describe('DoctorsComponent', () => {
  let component: DoctorsCPComponent;
  let fixture: ComponentFixture<DoctorsCPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsCPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsCPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
