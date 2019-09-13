import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsignComponent } from './testsign.component';

describe('TestsignComponent', () => {
  let component: TestsignComponent;
  let fixture: ComponentFixture<TestsignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
