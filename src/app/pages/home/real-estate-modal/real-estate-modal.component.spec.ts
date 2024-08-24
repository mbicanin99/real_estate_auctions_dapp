import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateModalComponent } from './real-estate-modal.component';

describe('RealEstateModalComponent', () => {
  let component: RealEstateModalComponent;
  let fixture: ComponentFixture<RealEstateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealEstateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealEstateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
