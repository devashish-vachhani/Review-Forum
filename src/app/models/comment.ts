export class Comment {
    private _id?: string;
    private _commenter: string;
    private _text: string;
    private _date: Date;
  
    constructor(commenter: string, text: string, date: Date, id?: string) {
      this._id = id;
      this._commenter = commenter;
      this._text = text;
      this._date = date;
    }
  
    get id(): string {
      return this._id;
    }
  
    get commenter(): string {
      return this._commenter;
    }
  
    get text(): string {
      return this._text;
    }
  
    get date(): Date {
      return this._date;
    }
  
    // setters
    set id(value: string) {
      this._id = value;
    }
  
    set commenter(value: string) {
      this._commenter = value;
    }
  
    set text(value: string) {
      this._text = value;
    }
  
    set date(value: Date) {
      this._date = value;
    }
  
    toJson(): any {
      return {
        commenter: this._commenter,
        text: this._text,
        date: this._date,
      };
    }
  }  