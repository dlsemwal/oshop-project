import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "environments/environment";

import { AdminAuthGuard } from "./admin-auth-guard.service";
import { AngularFireAuthModule } from "@angular/fire/auth";

describe("AdminAuthGuardService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [AdminAuthGuard]
    })
  );

  it("should be created", () => {
    const service: AdminAuthGuard = TestBed.get(AdminAuthGuard);
    expect(service).toBeTruthy();
  });
});
