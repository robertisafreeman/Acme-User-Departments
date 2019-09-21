const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_user_departments', { logging: false});

//Models:

const User = conn.define('user', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true

    }
});
const Department = conn.define('department', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        allowNUll: false,
        unique: true
    }
});

//Relationships:

User.belongsTo(Department);
Department.hasMany(User);


//Sync:

const syncOrSwim = async()=> {
    await conn.sync({ force: true });
    const departments = [
        {name: 'Plumbing'},
        {name: 'Sculpting'},
        {name: 'Tech'},
        {name: 'Management'}
    ];

    const [ Plumbing, Sculpting, Tech, Management ] = await Promise.all(departments.map(department => Department.create(department)));

    const users = [
        {name: 'Dave', departmentId: Sculpting.id},
        {name: 'Barbara', departmentId: Tech.id},
        {name: 'Devandra', departmentId: Plumbing.id},
        {name: 'Felix', departmentId: Management.id}
    ];

    const [ Dave, Barbara, Devandra, Felix ] = await Promise.all(users.map(user => User.create(user)));

    return {
        users: {
            Dave, 
            Barbara,
            Devandra,
            Felix
        }
    }
};

//Export Modules/Models: 

module.exports = {
    syncOrSwim,
    conn,
    models: {
        User,
        Department
    }
};
