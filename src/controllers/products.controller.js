const { Products} = require('../models');

async function getAllProducts(req, res) {
    try {
        const products = await Products.findAll();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
    
}

async function getProductById(req, res) {  
    try {
        const { id } = req.params;
        const product = await Products.findByPk(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produto' });
    }
}

async function createProduct(req, res) {
    try {
        const newProduct = await Products.create({
            name,
            price,
            originalPrice,
            image,
            category,
            description,
            size,
            colors,
            isNew,
            isSale
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await Products.findByPk(id);
        if (product) {
            product.name = name;
            product.price = price;
            product.originalPrice = originalPrice;
            product.image = image;
            product.category = category;
            product.description = description;
            product.size = size;
            product.colors = colors;
            product.isNew = isNew;
            product.isSale = isSale;

            await product.save();
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await Products.findByPk(id);
        if (product) {
            await product.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar produto' });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
