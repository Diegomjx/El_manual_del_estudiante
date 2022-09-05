//----------Items---------------

export class userItem {
    ID: number;
    USUARIO: string;
    CONTRASEÑA:string;
    NOMBRE:string;
    CORREO:string;

    constructor(ID: number,
                USUARIO: string,
                CONTRASEÑA:string,
                NOMBRE:string,
                CORREO:string){
                    this.ID = ID;
                    this.USUARIO = USUARIO;
                    this.CONTRASEÑA = CONTRASEÑA;
                    this.NOMBRE = NOMBRE;
                    this.CORREO = CORREO;
                }
}

export class IDItem{
    ID: number;
    constructor(ID:number){
        this.ID = ID;
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
    constructor(ID_PDF:number,
        ID:number,
        NOMBRE : string,
        PDF: string){
            this.ID =ID;
            this.NOMBRE=NOMBRE;
            this.PDF = PDF;
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

export class addPDF{
    FILE:Blob;
    NAME:string;
    constructor(FILE:Blob,
                NAME:string,
                 ){
            this.FILE=FILE;
            this.NAME=NAME;

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