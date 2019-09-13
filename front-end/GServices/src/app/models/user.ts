export class User{
    idUser:number;
    nom:String;
    prenom:String;
    date_naissance:String;
    role:String;
    login:String;
    password:String;
    gender:String;
    photo:String;
    constructor(nom:String,prenom:String,date_naissance:String,role:String,login:String,password:String,gender:String) {
        this.nom=nom;
        this.prenom=prenom;
        this.date_naissance=date_naissance;
        this.role=role;
        this.login=login;
        this.password=password;
        this.gender=gender;
        
}}