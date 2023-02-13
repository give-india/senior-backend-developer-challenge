module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transactions", {
      transactionId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      refNo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      transferFromAccount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      transferToAccount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return Transaction;
  };