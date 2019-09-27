import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MatIconModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'environments/environment';

import { BsNavbarComponent } from './bs-navbar.component';

describe("BsNavbarComponent", () => {
  let component: BsNavbarComponent;
  let fixture: ComponentFixture<BsNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BsNavbarComponent],
      imports: [
        RouterTestingModule,
        MatIconModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render total shopping count", () => {
    component.shoppingCartItemCount = 1;
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css(".badge-pill"));
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain("1");
  });
});
