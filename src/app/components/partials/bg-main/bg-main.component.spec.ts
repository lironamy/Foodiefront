import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgMainComponent } from './bg-main.component';

describe('BgMainComponent', () => {
  let component: BgMainComponent;
  let fixture: ComponentFixture<BgMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BgMainComponent]
    });
    fixture = TestBed.createComponent(BgMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
