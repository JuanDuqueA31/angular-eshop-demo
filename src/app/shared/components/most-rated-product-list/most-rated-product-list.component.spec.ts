import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRatedProductListComponent } from './most-rated-product-list.component';

describe('MostRatedProductListComponent', () => {
  let component: MostRatedProductListComponent;
  let fixture: ComponentFixture<MostRatedProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostRatedProductListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostRatedProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
