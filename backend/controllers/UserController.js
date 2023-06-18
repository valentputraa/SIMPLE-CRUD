import User from "../models/UserModel.js";
import validator from "validator";

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id','name', 'telephone', 'email', 'address']
        });
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
        const {name, telephone, email, address} = req.body
        const errors = []
        if (!name || !telephone || !email || !address) {
            errors.push("Please fill in completely");
          }
      
          if (!validator.isEmail(email)) {
            errors.push("Please enter email correctly");
          }
      
          if (!validator.isMobilePhone(telephone, 'id-ID')) {
            errors.push("Please enter phone correctly");
          }
      
          if (errors.length > 0) {
            return res.status(400).json({ errors });
          }
        await User.create({
            name,
            telephone,
            email,
            address
        })
        res.status(200).json({msg: "User created successfully"})
    } catch (error) {
        console.log(error.message);
    }
}

export const editUser = async (req, res) => {
    try {
        const {name, telephone, email, address} = req.body
        const errors = []
        if (!name || !telephone || !email || !address) {
            errors.push("Please fill in completely");
          }
      
          if (!validator.isEmail(email)) {
            errors.push("Please enter email correctly");
          }
      
          if (!validator.isMobilePhone(telephone, 'id-ID')) {
            errors.push("Please enter phone correctly");
          }
      
          if (errors.length > 0) {
            return res.status(400).json({ errors });
          }
        await User.update({
            name,
            telephone,
            email,
            address
        },{
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({msg: "User updated successfully"})
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!user) return res.status(404).json({msg: 'User not found'})
        await User.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({msg: "User deleted succesfully"})
    } catch (error) {
        console.log(error.message);
    }
}

