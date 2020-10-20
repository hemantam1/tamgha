const Continent = require('./continent.model');
const Country = require('./country.model');
const City = require('./city.model');
const User = require('./user.model');


Continent.hasMany(Country, { foreignKey: 'id_cont', onDelete: 'CASCADE' });
Country.belongsTo(Continent, { foreignKey: 'id_cont' });

Country.hasMany(City, { foreignKey: 'id_country', onDelete: 'CASCADE' });
City.belongsTo(Country, { foreignKey: 'id_country' });


module.exports = {
    Continent,
    Country,
    // City,
    User
};
