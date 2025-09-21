const { Users } = require('../models');
const bcrypt = require('bcrypt');

async function validateCreateUser(req, res, next){
    const { name, email, password } = req.body; // Desestruturação dos campos do corpo da requisição

    // Verifica se todos os campos obrigatórios estão presentes
    if(!name || !email || !password){
        return res.status(400).send({
            error: "Todos os campos são obrigatórios!"
        })
    }
    
    if(password.length < 8){
        return res.status(400).send({
            error: "A senha deve ter no mínimo 8 caracteres!"
        })
    }
    
    // Verifica se o email já está em uso
    const existingUser = await Users.findOne({
        where: {
            email: email
        }
    })

    if(existingUser){
        return res.status(400).send({
            error: "Email já está em uso!"
        })
    }

    const hashedPassword = await bcrypt.hash(
        req.body.password,
        10
    )

    req.body.password = hashedPassword;

    next(); // Chama o próximo middleware ou controlador
}