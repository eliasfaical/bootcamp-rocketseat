module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('delivery_mans', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'files',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColmn('delivery_mans', 'avatar_id');
  },
};
