module.exports = (sequelize, Sequelize) => {
    const Accounts = sequelize.define("accounts", {
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      accountTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalBalance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  
    return Accounts;
  };