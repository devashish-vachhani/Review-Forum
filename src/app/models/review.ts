export class Review {
    private _id?: string;
    private _reviewer: string;
    private _text: string;
    private _date: Date;
    private _rating: number;
    private _likes: string[];
  
    constructor(reviewer: string, text: string, date: Date, rating: number, likes: string[], id?: string) {
      this._id = id;
      this._reviewer = reviewer;
      this._text = text;
      this._date = date;
      this._rating = rating;
      this._likes = likes;
    }
  
    get id(): string | undefined {
      return this._id;
    }
  
    set id(value: string | undefined) {
      this._id = value;
    }
  
    get reviewer(): string {
      return this._reviewer;
    }
  
    set reviewer(value: string) {
      this._reviewer = value;
    }
  
    get text(): string {
      return this._text;
    }
  
    set text(value: string) {
      this._text = value;
    }
  
    get date(): Date {
      return this._date;
    }
  
    set date(value: Date) {
      this._date = value;
    }
  
    get rating(): number {
      return this._rating;
    }
  
    set rating(value: number) {
      this._rating = value;
    }
  
    get likes(): string[] {
      return this._likes;
    }
  
    set likes(value: string[]) {
      this._likes = value;
    }

    toJson(): any {
        return {
          reviewer: this._reviewer,
          text: this._text,
          date: this._date,
          rating: this._rating,
          likes: this._likes,
        };
    }
  }
  