import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersoComponent } from './list-perso.component';

describe('ListPersoComponent', () => {
  let component: ListPersoComponent;
  let fixture: ComponentFixture<ListPersoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPersoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
