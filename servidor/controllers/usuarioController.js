const Usuario = require("../models/Usuario");
const {
    checkSchema,
    validationResult
} = require('express-validator');

exports.validator = checkSchema({
    nombre: {
        isAlpha: {
            errorMessage: 'El nombre no tiene numeros'
        },
        isLength: {
            errorMessage: 'El nombre tiene que tener 3 letras al menos',
            // Multiple options would be expressed as an array
            options: {
                min: 3
            },
        },
    },
    apellidos: {
        isAlpha: {
            errorMessage: 'El apellido no tienen numeros'
        },
        isLength: {
            errorMessage: 'El apellido tiene que tener 3 letras al menos',
            // Multiple options would be expressed as an array
            options: {
                min: 3
            },
        },
    },
    edad: {
        isInt: {
            errorMessage: 'La edad tiene que ser entre 0 y 125',
            // Multiple options would be expressed as an array
            options: {
                gt: 0,
                lt: 125
            },
        },
    },
    birthday: {
        isISO8601: {
            errorMessage: 'Wrong date  format',
        }
    },
    dni: {
        custom: {
            errorMessage: 'Dni is invalid',
            options: (value) => {
                const dniRegex = new RegExp('^[0-9]{8,8}[A-Za-z]$');
                if (!value.match(dniRegex)) {
                    throw new Error('Dni is invalid');
                }
                // Indicates the success of this synchronous custom validator
                return true;

            }
        }
    },
    gender: {
        custom: {
            errorMessage: 'Wrong date  format',
            options: (value) => {
                const genders = ['hombre', 'mujer', 'otro', 'noGender']
                if (!genders.includes(value)) {
                    throw new Error('Wrong Gender');
                }
                return true;
            }
        }
    },
    favColor: {
        isAlpha: {
            errorMessage: 'El Color tiene que tener letras',
        },
        isLength: {
            errorMessage: 'El Color tiene que tener 3 letras al menos',
            // Multiple options would be expressed as an array
            options: {
                min: 3
            },
        }
    }
});

exports.crearUsuario = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        let usuario;

        //Crear usuario
        usuario = new Usuario(req.body);

        await usuario.save();
        res.send(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarUsuario = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {nombre, apellidos, edad, dni, birthday, gender, favColor} = req.body;
        let usuario = await Usuario.findById(req.params.id);

        if(!usuario) {
            res.status(404).json({ msg: 'No existe el usuario'})
        }

        usuario.nombre = nombre;
        usuario.apellidos = apellidos;
        usuario.edad = edad;
        usuario.dni = dni;
        usuario.birthday = birthday;
        usuario.gender = gender;
        usuario.favColor = favColor;

        usuario = await Usuario.findOneAndUpdate({ _id:req.params.id }, usuario, {new: true} )
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerUsuario = async (req, res) => {
    try {
        let usuario = await Usuario.findById(req.params.id);

        if(!usuario) {
            res.status(404).json({ msg: 'No existe el usuario'})
        }

        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarUsuario = async (req, res) => {
    try {
        let usuario = await Usuario.findById(req.params.id);

        if(!usuario) {
            res.status(404).json({ msg: 'No existe el usuario'})
        }

        await Usuario.findOneAndRemove({_id: req.params.id})
        res.json({ msg: 'Usuario eliminado.'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
