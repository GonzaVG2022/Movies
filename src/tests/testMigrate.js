const sequelize = require('../utils/connection');
require('../models/Movie');
require('../models/Director');
require('../models/Actor');
require('../models/Genre');

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        // funciones de create...
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();