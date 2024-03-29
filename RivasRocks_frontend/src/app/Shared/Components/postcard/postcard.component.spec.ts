import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardComponent } from './postcard.component';

describe('CardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostCardComponent]
    });
    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
