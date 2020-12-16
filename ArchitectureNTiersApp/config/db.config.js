module.exports = {
	HOST: "localhost",
	USER: "user", // TODO
	PASSWORD: "mdp", // TODO
	DB: "bdd_stages",
	dialect: "postgres",
	pool: {
	max: 5,
	min: 0,
	acquire: 30000, // Maximum time in ms for the incoming connexion to succeed before getting en error.
	idle: 10000
	}
};