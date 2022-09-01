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