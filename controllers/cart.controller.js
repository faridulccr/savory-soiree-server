const { ObjectId } = require("mongodb");

// get all carts
const getAllCarts = (carts) => {
    return async (req, res) => {
        const { email } = req.params;
        const allCarts = await carts.find({ email }).toArray();
        // console.log(allCarts);

        allCarts.length > 0
            ? res.status(200).json(allCarts)
            : res.status(404).json({ error: "data not found" });
    };
};

// add a cart to data cart collection
const addCart = (carts) => {
    return async (req, res) => {
        const newCart = await carts.insertOne(req.body);
        // console.log(newCart);

        newCart.acknowledged
            ? res.status(200).json({ message: "Added to cart!" })
            : res.status(400).json({ error: "Bad request!" });
    };
};

// // delete cart
const deleteCart = (carts) => {
    return async (req, res) => {
        // Generate a new ObjectId
        const objectId = new ObjectId(req.params.id);
        const deletedCart = await carts.deleteOne({ _id: objectId });
        // console.log(deletedCart);

        deletedCart.acknowledged
            ? res.status(200).json({ message: "successfully deleted" })
            : res.status(400).json({ error: "Bad Request" });
    };
};

module.exports = {
    getAllCarts,
    addCart,
    deleteCart,
};
