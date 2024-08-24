import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingSectionComponent } from './bidding-section.component';

describe('BiddingSectionComponent', () => {
  let component: BiddingSectionComponent;
  let fixture: ComponentFixture<BiddingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiddingSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiddingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
