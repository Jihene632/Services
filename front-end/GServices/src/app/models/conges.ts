import { Personnel } from "./personnel";

export class Conges{
    idConges:number;
    dureeD:string;
    dureeF:string;
    raisons:string;
    personnel:Personnel;
    constructor(dureeD:string,dureeF:string,raisons:string,personnel:Personnel) {
        this.dureeD=dureeD;
        this.dureeF=dureeF;
        this.raisons=raisons;
        this.personnel=personnel;
    
   
}}