export class User {
  private _firstName: string;
  private _lastName: string;
  private _gender: string;
  private _email: string;
  private _password: string;
  private _birthday: Date;
  private _telephone: string;
  private _country: string;
  private _bio: string;
  private _favoriteNumber: string;
  private _favoriteColor: string;
  private _avatarImagePath: string;
  private _agreementLevel: string;
  private _getsNewsletter: boolean;
  readonly createdAt: Date;

  constructor(firstName: string, lastName: string, gender: string, email: string, password: string, birthday: Date, telephone: string, country: string, bio: string, favoriteNumber: string, favoriteColor: string, avatarImagePath: string, agreementLevel: string, getsNewsletter: boolean){
    this._firstName = firstName;
    this._lastName = lastName;
    this._gender = gender;
    this._email = email;
    this._password = password;
    this._birthday = birthday;
    this._telephone = telephone;
    this._country = country;
    this._bio = bio;
    this._favoriteNumber = favoriteNumber;
    this._favoriteColor = favoriteColor;
    this._avatarImagePath = avatarImagePath;
    this._agreementLevel = agreementLevel;
    this._getsNewsletter = getsNewsletter;
    this.createdAt = new Date();
  }

  get firstName(){
    return this._firstName;
  }

  set firstName(firstName: string){
    this._firstName = firstName;
  }

  get lastName(){
    return this._lastName;
  }

  set lastName(lastName: string){
    this._lastName = lastName;
  }

  get gender(){
    return this._gender;
  }

  set gender(gender: string){
    this._gender = gender;
  }

  get email(){
    return this._email;
  }

  set email(email: string){
    this._email = email;
  }

  get password(){
    return this._password;
  }

  set password(password: string){
    this._password = password;
  }

  get birthday(){
    return this._birthday;
  }

  set birthday(birthday: Date){
    this._birthday = birthday;
  }

  get telephone(){
    return this._telephone;
  }

  set telephone(telephone: string){
    this._telephone = telephone;
  }

  get country(){
    return this._country;
  }

  set country(country: string){
    this._country = country;
  }

  get bio(){
    return this._bio;
  }

  set bio(bio: string){
    this._bio = bio;
  }

  get favoriteNumber(){
    return this._favoriteNumber;
  }

  set favoriteNumber(favoriteNumber: string){
    this._favoriteNumber = favoriteNumber;
  }

  get favoriteColor(){
    return this._favoriteColor;
  }

  set favoriteColor(favoriteColor: string){
    this._favoriteColor = favoriteColor;
  }

  get avatarImagePath(){
    return this._avatarImagePath;
  }

  set avatarImagePath(avatarImagePath: string){
    this._avatarImagePath = avatarImagePath;
  }

  get agreementLevel(){
    return this._agreementLevel;
  }

  set agreementLevel(agreementLevel: string){
    this._agreementLevel = agreementLevel;
  }

  get getsNewsletter(){
    return this._getsNewsletter;
  }

  set getsNewsletter(getsNewsletter: boolean){
    this._getsNewsletter = getsNewsletter;
  }
}