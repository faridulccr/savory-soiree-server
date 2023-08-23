// const { ObjectId } = require("mongodb");
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

module.exports = {
    getAllReview,
};
