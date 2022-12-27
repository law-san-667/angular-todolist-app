export class Task {

    private id !: number;
    private libelle!: string;
    private statut!:string;
    private user!: string;

    constructor(id: number, libelle: string, statut:string, user: string){
        this.id = id;
        this.libelle = libelle;
        this.statut = statut;
        this.user = user;
    }
    get getId():number{
        return this.id;
    }
    get getLibelle():string{
        return this.libelle;
    }
    get getStatut():string{
        return this.statut;
    }
    get getUser():string{
        return this.user;
    }   
    set setLibelle(libelle:string){
        this.libelle = libelle;
    }
    set setStatut(statut:string){
        this.statut = statut;
    }
    set setUser(user:string){
        this.user = user;
    }
}