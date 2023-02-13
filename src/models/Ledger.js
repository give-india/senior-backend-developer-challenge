module.exports = (sequelize, Sequelize) => {
    const Ledgers = sequelize.define("ledgers", {
      ledgerId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      transactionId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ledgerType: {
        type: Sequelize.ENUM,
        values: ['C', 'D',],
        allowNull: false
      }
    });
  
    return Ledgers;
  };