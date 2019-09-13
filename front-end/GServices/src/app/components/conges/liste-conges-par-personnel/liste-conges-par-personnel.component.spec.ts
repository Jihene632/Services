import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCongesParPersonnelComponent } from './liste-conges-par-personnel.component';

describe('ListeCongesParPersonnelComponent', () => {
  let component: ListeCongesParPersonnelComponent;
  let fixture: ComponentFixture<ListeCongesParPersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeCongesParPersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCongesParPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
