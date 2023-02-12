module.exports = (sequelize, Sequelize) => {
    const Accounts = sequelize.define("accounts", {
    accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER
      },
      accountTypeId: {
        type: Sequelize.INTEGER
      },
      totalBalance: {
        type: Sequelize.INTEGER
      },
    },{
        timestamps: false
      });
  
    return Accounts;
  };