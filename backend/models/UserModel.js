import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const User = db.define('users', {
    name : {
        type : DataTypes.STRING,
        allowNull: false
    },
    telephone : {
        type : DataTypes.STRING,
        allowNull: false
    },
    address : {
        type : DataTypes.STRING,
        allowNull: false
    },
    email : {
        type : DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName: true
})

export default User;

(async () => {
    await db.sync()
})();