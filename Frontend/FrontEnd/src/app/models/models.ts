//----------Items---------------

export class userItem {
    ID: number;
    USUARIO: string;
    CONTRASEÑA:string;
    NOMBRE:string;
    CORREO:string;
    Rol:string;

    constructor(ID: number,
                USUARIO: string,
                CONTRASEÑA:string,
                NOMBRE:string,
                CORREO:string,
                Rol:string){
                    this.ID = ID;
                    this.USUARIO = USUARIO;
                    this.CONTRASEÑA = CONTRASEÑA;
                    this.NOMBRE = NOMBRE;
                    this.CORREO = CORREO;
                    this.Rol = Rol;

                }
}

export class IDItem{
    ID: number;
    constructor(ID:number){
        this.ID = ID;
    }
}

export class adminPeticion{
    Revised:number;
    ID:number;
    constructor(Revised:number, ID:number){
        this.Revised=Revised;
        this.ID=ID;
    }
}
export class UpdateApuntesItem{
    ID_PDF:number;
    NOMBRE:string;
    Private:number;

    constructor( ID_PDF:number,NOMBRE:string,Private:number){
        this.ID_PDF =ID_PDF;
        this.NOMBRE = NOMBRE;
        this.Private = Private;
    }
}

export class ID_LISTAiTEM{
    ID_LISTA: number;
    constructor(ID_LISTA:number){
        this.ID_LISTA = ID_LISTA;
    }
}

export class USUARIOIDC{
    USUARIO:string;
    ID:number;
    c:string;

    constructor(USUARIO:string,
                ID:number,
                c:string){

                this.USUARIO=USUARIO;
                this.ID=ID;
                this.c=c;
        }
}


export class USUARIOID{
    USUARIO:string;
    ID:number;

    constructor(USUARIO:string,
                ID:number){

                this.USUARIO=USUARIO;
                this.ID=ID;

        }
}


export class ListItem{
    ID: number;
    NOMBRE: string;
    ID_LISTA:number;
    constructor(ID:number, NOMBRE:string, ID_LISTA:number){
        this.ID = ID;
        this.NOMBRE=NOMBRE;
        this.ID_LISTA=ID_LISTA;
    }

}

export class ListItemsend{
    ID: number;
    NOMBRE: string;

    constructor(ID:number, NOMBRE:string){
        this.ID = ID;
        this.NOMBRE=NOMBRE;
    }

}

export class ListwhithPDF{
    ID_LISTA:number;
    ID:number;
    NOMBRE:string; 
    ID_PDF:number;

    constructor(ID_LISTA:number,ID:number,NOMBRE:string, ID_PDF:number){
        this.ID_LISTA=ID_LISTA;
        this.ID = ID;
        this.NOMBRE=NOMBRE;
        this.ID_PDF = ID_PDF;
    }

}

export class ID_PDFItem{
    ID_PDF: number;
    constructor(ID_PDF:number){
        this.ID_PDF = ID_PDF;
    }
}

export class ApuntesItem {
    ID_PDF:number;
    ID:number;
    NOMBRE : string;
    PDF: string;
    APRUBE:number;
    Revised:number;
    Megusta:string;
    fecha:Date;
    Private:number;
    constructor(ID_PDF:number,
        ID:number,
        NOMBRE : string,
        PDF: string,
        APRUBE:number,
        Revised:number,
        Megusta:string,
        fecha:Date,
        Private:number){
            this.ID =ID;
            this.NOMBRE=NOMBRE;
            this.PDF = PDF;
            this.APRUBE = APRUBE;
            this.Revised = Revised
            this.Megusta = Megusta;
            this.fecha = fecha;
            this.Private=Private;
        }
    
}

export class IDandID_PDFItem {
    ID: number;
    ID_PDF:number;
    constructor(ID:number, ID_PDF:number){
        this.ID = ID;
        this.ID_PDF = ID_PDF;
    }
}

export class IDSeguidorandIDSiguiendo {
    ID1: number;
    ID2: number;
    constructor(ID1:number, ID2:number){
        this.ID1 = ID1;
        this.ID2 = ID2;
    }
}

export class IDandID_ListItem {
    ID: number;
    ID_LISTA:number;
    constructor(ID:number, ID_LISTA:number){
        this.ID = ID;
        this.ID_LISTA = ID_LISTA;
    }
}

export class ID_LISTAandID_PDFItem{
    ID_LISTA: number;
    ID_PDF:number;
    constructor(ID_LISTA:number, ID_PDF:number){
        this.ID_LISTA = ID_LISTA;
        this.ID_PDF = ID_PDF;
    }
}

export class LIstofListwhithPDFItem{
    ID_LISTA:number;
    NOMBRE:string;
    boolean:string;
    Megusta:string;
    constructor(ID_LISTA:number,
                 NOMBRE:string,
                 boolean:string,
                 Megusta:string){
                    this.ID_LISTA=ID_LISTA;
                    this.NOMBRE = NOMBRE;
                    this.boolean = boolean;
                    this.Megusta = Megusta;

        }

}



//----------------Get-------------------


//-----------------Post--------------
export class LoginUser {
    USUARIO: string;
    CONTRASEÑA:string;
    constructor(USUARIO: string,
                CONTRASEÑA:string,){
                    this.USUARIO = USUARIO;
                    this.CONTRASEÑA = CONTRASEÑA;
                }
}

export class addUser {
    USUARIO: string;
    CONTRASEÑA:string;
    NOMBRE:string;
    CORREO:string;

    constructor(USUARIO: string,
                CONTRASEÑA:string,
                NOMBRE:string,
                CORREO:string){
                    this.USUARIO = USUARIO;
                    this.CONTRASEÑA = CONTRASEÑA;
                    this.NOMBRE = NOMBRE;
                    this.CORREO = CORREO;
                }
}



export class getBooleanofListinPDF{
    ID_LISTA: number;
    ID:number;
    ID_PDF:number;

    constructor(ID_LISTA:number,ID:number,ID_PDF:number){
        this.ID_LISTA=ID_LISTA;
        this.ID= ID;
        this.ID_PDF= ID_PDF;
    }

}


//------------------Response------------

export class response {
    status: number;
    msg: string;
    constructor(status:number,msg:string) {
        this.status=status;
        this.msg=msg;
    }
}

export class userList{
    status: number;
    msg: string;
    result:Array<userItem>;
    constructor(status:number,
                msg:string,
                result:Array<userItem>) {
                        this.status=status;
                        this.msg=msg;
                        this.result = result;
    }

}


export class ApuntesList{
    status: number;
    msg: string;
    result:Array<ApuntesItem>;
    constructor(status:number,
                msg:string,
                result:Array<ApuntesItem>) {
                        this.status=status;
                        this.msg=msg;
                        this.result = result;
    }

}

export class ListList{
    status: number;
    msg: string;
    result:Array<ListItem>;
    constructor(status:number,
                msg:string,
                result:Array<ListItem>) {
                        this.status=status;
                        this.msg=msg;
                        this.result = result;
    }


}


export class LIstofListwhithPDF{
    status: number;
    msg: string;
    result:Array<LIstofListwhithPDFItem>;
    constructor(status:number,
                msg:string,
                result:Array<LIstofListwhithPDFItem>) {
                        this.status=status;
                        this.msg=msg;
                        this.result = result;
    }

}

export class responseSeguir{
    status: number;
    msg: string;
    result:USUARIOIDC;
    constructor(status:number,
                msg:string,
                result:USUARIOIDC) {
                        this.status=status;
                        this.msg=msg;
                        this.result = result;
    }
}

export class siguiendo{
    status: number;
    msg: string;
    result:Array<USUARIOID>;
    constructor(status:number,
                msg:string,
                result:Array<USUARIOID>) {
                        this.status=status;
                        this.msg=msg;
                        this.result = result;
    }
}

