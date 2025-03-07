import { sequelize } from "../config/db";

const User = sequelize.define('users', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true,
		},
	},
	createdAt: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: Sequelize.NOW,
	},
})

User.hasMany(Events, { foreignKey: 'createdBy' })


export default User;