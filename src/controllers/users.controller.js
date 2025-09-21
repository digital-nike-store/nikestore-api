const { Users } = require('../models');

// Create a new user
async function createUser(req, res){
    try {
        await Users.create(req.body);
        return res.status(201).json("Usuário criado com sucesso!");
    } catch (error) {
        return res.status(500).send({
            message: "Erro ao criar usuário",
            error: error.message
        });
    }
}