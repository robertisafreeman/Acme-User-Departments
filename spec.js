const { expect } = require('chai');
const db = require('./db');

describe('Acme User Departments', ()=> {
    let seed;
    beforeEach(async()=> seed = await db.syncOrSwim());
    describe('Data Layers', ()=> {
        it('Dave, Barbara, Devandra, Felix are users', ()=> {
            expect(seed.users.Dave.name).to.equal('Dave');
        } )
    })
})