import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { CoreModule, SharedModule, TestingHelper } from '../../imports';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthRequestService } from '../../services/auth-request.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  const testingHelper = new TestingHelper();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutComponent],
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
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
