async function validateGetProductId(req, res, next){
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'ID do produto é obrigatório' });
    }
    next();
}

async function validateCreatProduct(req, res, next){
    const { name, price, originalPrice, image, category, description, size, colors, isNew, isSale } = req.body;
    if (!name || !price || !image || !category || !size || !colors || isNew === undefined || isSale === undefined) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    }
    next();
}

async function validateUpdateProduct(req, res, next){
    const { id } = req.params;
    const { name, price, originalPrice, image, category, description, size, colors, isNew, isSale } = req.body;
    if (!id || !name || !price || !image || !category || !size || !colors || isNew === undefined || isSale === undefined) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    }
    next();
}

async function validateDeleteProduct(req, res, next){
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'ID do produto é obrigatório' });
    }
    next();
}

module.exports = {
    validateCreatProduct,
    validateUpdateProduct,
    validateDeleteProduct,
    validateGetProductId
};
