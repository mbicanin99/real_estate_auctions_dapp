import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateAddModalComponent } from './real-estate-add-modal.component';

describe('RealEstateAddModalComponent', () => {
  let component: RealEstateAddModalComponent;
  let fixture: ComponentFixture<RealEstateAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealEstateAddModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealEstateAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
