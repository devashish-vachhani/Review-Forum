import { UserService } from "src/app/services/user.service";

export const UserServiceStub = jasmine.createSpyObj<UserService>(
    'UserService', 
    {
        username: 'test',
    }
);