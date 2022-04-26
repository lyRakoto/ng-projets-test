export class Post {
    private _title: string;
    private _content: string;
    private _loveIts: number;
    readonly createdAt: Date;
  
    constructor(title: string, content: string){
      this.title = title;
      this.content = content;
      this.loveIts = 0;
      this.createdAt = new Date();
    }
  
    get title(){
      return this._title;
    }
  
    set title(title: string){
      this._title = title;
    }
  
    get content(){
      return this._content;
    }
  
    set content(content: string){
      this._content = content;
    }
  
    get loveIts(){
      return this._loveIts;
    }
  
    set loveIts(loveIts: number){
      this._loveIts = loveIts;
    }
  
  }