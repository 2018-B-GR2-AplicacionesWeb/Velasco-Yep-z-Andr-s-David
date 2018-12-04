export const preguntaMenu_Inicio = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Login',
    choices: [
        'Administrador',
        'Cliente',
    ]
}

export  const preguntaMenu_administrador = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que quieres hacer',
    choices: [
        'Modulo Pizzas',
        'Modulo Clientes',
    ]
}

export const preguntaMenu_crud = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que quieres hacer',
    choices: [
        'Consultar',
        'Crear',
        'Actualizar',
        'Eliminar',
    ]
}

export const preguntaBuscar_pizza = [
    {
        type: 'input',
        name: 'id_pizza',
        message: 'Ingrese ID Pizza',
    }
];

const pregunta_ingresar_pizza = [
    {
        type: 'input',
        name: 'id_pizza',
        message: 'Ingrese ID Pizza',
    },
    {
        type: 'input',
        name: 'id_pizza',
        message: 'Nombre de pizza',
    }
];

const pregunta_actualizar_pizza = [
    {
        type: 'input',
        name: 'id_pizza',
        message: 'Ingrese ID Pizza',
    },
    {
        type: 'input',
        name: 'id_pizza',
        message: 'Nombre de pizza',
    }
];