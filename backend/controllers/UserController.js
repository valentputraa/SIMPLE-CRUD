import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
       res.status(200).json(users)
    } catch (error) {
        console.log(error.message)
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!user) return res.status(404).json({msg: 'User not found'})
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
    }
}

export const createUser = async (req, res) => {
    try {
        const {name, telephone, email} = req.body
        if(!name || !telephone || !email) return res.status(400).json({msg: 'Please fill in completely'})
        await User.create({
            name,
            telephone,
            email
        })
        res.status(200).json({msg: "User created successfully"})
    } catch (error) {
        console.log(error.message);
    }

}

