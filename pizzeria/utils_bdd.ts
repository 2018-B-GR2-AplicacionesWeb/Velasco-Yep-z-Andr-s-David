export interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
    opcionMenu?: OpcionMenu;
    cliente?: Cliente;
    indiceCliente?: number;
    opcioMenu_inicio?:OpcionMenu_inicio;
}

export interface BDD {
    clientes: Cliente[] | any;
    pizzas: Pizza[];
}


export interface Cliente {
    id: number;
    nombre: string;
}

export interface Pizza {
    id: number;
    nombre: string;
}

export interface OpcionMenu {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar';
}


export interface OpcionMenu_inicio {
    opcionMenu: 'Adminstrador' | 'Cliente';
}

export interface Buscar_Cliente_Por_Id {
    idCliente: string;
}