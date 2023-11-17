// get all users
const getAllUsers = (users) => {
    return async (req, res) => {
        const allUsers = await users.find().toArray();
        // console.log(allUsers);

        allUsers.length > 0
            ? res.status(200).json(allUsers)
            : res.status(404).json({ error: "data not found" });
    };
};

// get a single user by email
const getSingleUser = (users) => {
    return async (req, res) => {
        const { email } = req.params;
        const user = await users.findOne({ email });
        // console.log(user);

        user
            ? res.status(200).json(user)
            : res.status(404).json({ error: "data not found" });
    };
};

// create a user to user collection
const createUser = (users) => {
    return async (req, res) => {
        const data = req.body;
        // find the existing user
        const user = await users.findOne({ email: data.email });
        if (!user) {
            const newUser = await users.insertOne(data);
            // console.log(newUser);
            newUser.acknowledged
                ? res
                      .status(200)
                      .json({ message: "user created successfully!" })
                : res.status(400).json({ error: "Server error!" });
        } else res.status(400).json({ error: "User is already exist!" });
    };
};

// update user role
const updateUserRole = (users) => {
    return async (req, res) => {
        const { email } = req.params;
        const updatedUser = await users.updateOne(
            { email },
            { $set: { role: "admin" } }
        );
        // console.log(updatedUser);

        updatedUser.acknowledged
            ? res.status(200).json({ message: "successfully updated" })
            : res.status(400).json({ error: "Bad Request" });
    };
};

// delete user
const deleteUser = (users) => {
    return async (req, res) => {
        const deletedUser = await users.deleteOne({ email: req.params.email });
        // console.log(deletedUser);

        deletedUser.acknowledged
            ? res.status(200).json({ message: "successfully deleted" })
            : res.status(400).json({ error: "Bad Request" });
    };
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUserRole,
    deleteUser,
};
