import { of } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

export const AuthServiceStub = jasmine.createSpyObj<AuthService>(
    'AuthService',
    {
        uid: '1',
    }
)