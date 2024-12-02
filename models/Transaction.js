const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const { toDefaultValue } = require("sequelize/lib/utils");

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        type: {
            type: DataTypes.ENUM('income', 'expense'),
            allowNull: false,
        },
        
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    })

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',    
        });
    }

    return Transaction;
};
