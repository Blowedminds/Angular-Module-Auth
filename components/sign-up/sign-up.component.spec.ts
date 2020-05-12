import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { CoreModule, SharedModule, TestingHelper } from '../../imports';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthRequestService } from '../../services/auth-request.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  const testingHelper = new TestingHelper();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      providers: [
        AuthRequestService
      ],
      imports: [
        NoopAnimationsModule,
        CoreModule,
        SharedModule,
        RouterTestingModule.withRoutes(testingHelper.routes)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
