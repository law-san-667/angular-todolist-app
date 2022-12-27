export class User {

    private id !: number;
    private login!: string;
    private password!:string;

    constructor(login: string, password:string){
        this.login = login;
        this.password = password;
    }
    get getId():number{
        return this.id;
    }
    get getLogin():string{
        return this.login;
    }
    get getPassword():string{
        return this.password;
    }
    set setLogin(login:string){
        this.login = login;
    }
    set setPassword(password:string){
        this.password = password;
    }
}