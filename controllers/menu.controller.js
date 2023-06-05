// const { ObjectId } = require("mongodb");

// get all menu
const getAllMenu = (menuCollection) => {
    return async (req, res) => {
        const allMenu = await menuCollection.find().toArray();
        // console.log(allMenu);

        allMenu.length > 0
            ? res.status(200).json(allMenu)
            : res.status(404).json({ error: "data not found" });
    };
};

// get all review
const getAllReview = (reviewCollection) => {
    return async (req, res) => {
        const allReview = await reviewCollection.find().toArray();
        // console.log(allReview);

        allReview.length > 0
            ? res.status(200).json(allReview)
            : res.status(404).json({ error: "data not found" });
    };
};

// get single product
// const getSingleProduct = (products) => {
//     return async (req, res) => {
//         // Generate a new ObjectId
//         const objectId = new ObjectId(req.params.id);
//         const singleProduct = await products.find({ _id: objectId }).toArray();
//         // console.log(singleProduct);

//         singleProduct.length > 0
//             ? res.status(200).json(singleProduct[0])
//             : res.status(404).json({ error: "data not found" });
//     };
// };

// // find product by email
// const findProductByEmail = (products) => {
//     return async (req, res) => {
//         const userProducts = await products
//             .find({ email: req.params.email })
//             .toArray();
//         // console.log(userProducts);

//         userProducts.length > 0
//             ? res.status(200).json(userProducts)
//             : res.status(404).json({ error: "data not found" });
//     };
// };

// // find product by category
// const findProductByCategory = (products) => {
//     return async (req, res) => {
//         const sports_cars = await products
//             .find({ category: "sports car" })
//             .toArray();
//         // console.log(sports_cars);

//         const trucks = await products.find({ category: "truck" }).toArray();
//         // console.log(trucks);

//         const police_cars = await products
//             .find({ category: "police car" })
//             .toArray();
//         // console.log(police_cars);

//         sports_cars.length > 0 || trucks.length > 0 || police_cars.length > 0
//             ? res.status(200).json({ sports_cars, trucks, police_cars })
//             : res.status(500).json({ error: "data not found" });
//     };
// };

// // create product
// const createProduct = (products) => {
//     return async (req, res) => {
//         const newProduct = await products.insertOne(req.body);
//         // console.log(newProduct);

//         newProduct.acknowledged
//             ? res.status(200).json({ message: "product successfully added" })
//             : res.status(400).json({ error: "Bad Request" });
//     };
// };

// // update product
// const updateProduct = (products) => {
//     return async (req, res) => {
//         // Generate a new ObjectId
//         const objectId = new ObjectId(req.params.id);
//         const updatedProduct = await products.updateOne(
//             { _id: objectId },
//             { $set: { ...req.body } }
//         );
//         // console.log(updatedProduct);

//         updatedProduct.acknowledged
//             ? res.status(200).json({ message: "successfully updated" })
//             : res.status(400).json({ error: "Bad Request" });
//     };
// };

// // delete product
// const deleteProduct = (products) => {
//     return async (req, res) => {
//         // Generate a new ObjectId
//         const objectId = new ObjectId(req.params.id);
//         const deletedProduct = await products.deleteOne({ _id: objectId });
//         // console.log(deletedProduct);

//         deletedProduct.acknowledged
//             ? res.status(200).json({ message: "successfully deleted" })
//             : res.status(400).json({ error: "Bad Request" });
//     };
// };

module.exports = {
    getAllMenu,
    getAllReview,
};
