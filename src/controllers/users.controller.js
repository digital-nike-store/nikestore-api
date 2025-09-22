const { Users } = require('../models');

// Create a new user
async function createUser(req, res){
    try {
        const newUser = req.body;
        await Users.create(newUser);
        return res.status(201).send(`Usuário criado com sucesso! \n ${JSON.stringify(newUser)}`);
    } catch (error) {
        return res.status(500).send({
            message: "Erro ao criar usuário",
            error: error.message
        });
    }
}

module.exports = {
    createUser
}