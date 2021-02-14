import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuerManagerComponent } from './issuer-manager.component';

describe('IssuerManagerComponent', () => {
  let component: IssuerManagerComponent;
  let fixture: ComponentFixture<IssuerManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuerManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
