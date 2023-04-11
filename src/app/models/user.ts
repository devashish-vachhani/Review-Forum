export class AppUser {
    private _email: string;
    private _username: string;
    private _isAdmin: boolean;
  
    constructor(email: string, username: string, isAdmin: boolean) {
      this._email = email;
      this._username = username;
      this._isAdmin = isAdmin;
    }
  
    get email() {
      return this._email;
    }
  
    set email(email: string) {
      this._email = email;
    }
  
    get username() {
      return this._username;
    }
  
    set username(username: string) {
      this._username = username;
    }
  
    get isAdmin() {
      return this._isAdmin;
    }
  
    set isAdmin(isAdmin: boolean) {
      this._isAdmin = isAdmin;
    }

    toJson(): any {
        return {
          email: this._email,
          username: this._username,
          isAdmin: this._isAdmin
        };
      }
  }  