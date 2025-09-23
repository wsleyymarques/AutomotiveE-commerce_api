'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Products', 'image', 'imageUrl');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Products', 'imageUrl', 'image');
  }
};
