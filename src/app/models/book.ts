export class Book {
    private _title: string;
    private _author: string;
    private _description: string;
    private _image: string;
    private _tags: string[];
    private _status: string;
    private _requester: string;
    private _id?: string;
  
    constructor(title: string, author: string, description: string, image: string, tags: string[], status: string, requester: string, id?: string) {
      this._title = title;
      this._author = author;
      this._description = description;
      this._image = image;
      this._tags = tags;
      this._status = status;
      this._requester = requester;
      this._id = id;
    }
  
    get title(): string {
      return this._title;
    }
  
    set title(value: string) {
      this._title = value;
    }
  
    get author(): string {
      return this._author;
    }
  
    set author(value: string) {
      this._author = value;
    }
  
    get description(): string {
      return this._description;
    }
  
    set description(value: string) {
      this._description = value;
    }
  
    get image(): string {
      return this._image;
    }
  
    set image(value: string) {
      this._image = value;
    }
  
    get tags(): string[] {
      return this._tags;
    }
  
    set tags(value: string[]) {
      this._tags = value;
    }
  
    get status(): string {
      return this._status;
    }
  
    set status(value: string) {
      this._status = value;
    }

    get requester(): string {
      return this._requester;
    }
  
    set requester(value: string) {
      this._requester = value;
    }
  
    get id(): string | undefined {
      return this._id;
    }
  
    set id(value: string | undefined) {
      this._id = value;
    }

    hasTag(tag: string): boolean {
        return this._tags.includes(tag);
    }

    toJSON(): any {
        return {
          title: this.title,
          author: this.author,
          description: this.description,
          image: this.image,
          tags: this.tags,
          status: this.status,
          requester: this.requester,
        };
    }
  }
  
