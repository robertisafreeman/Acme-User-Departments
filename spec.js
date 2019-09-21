const { expect } = require('chai');
const db = require('./db');

describe('Acme User Departments', ()=> {
    let seed;
    beforeEach(async()=> seed = await db.syncOrSwim());
    describe('Data Layers', ()=> {
        it('Dave, Barbara, Devandra, Felix are users', ()=> {
            expect(seed.users.Dave.name).to.equal('Dave');
            expect(seed.users.Barbara.name).to.equal('Barbara');
            expect(seed.users.Devandra.name).to.equal('Devandra');
            expect(seed.users.Felix.name).to.equal('Felix');
        })
        it('Plumbing, Sculpting, Tech, Management are departments', ()=> {
            expect(seed.departments.Plumbing.name).to.equal('Plumbing');
            expect(seed.departments.Sculpting.name).to.equal('Sculpting');
            expect(seed.departments.Tech.name).to.equal('Tech');
            expect(seed.departments.Management.name).to.equal('Management');
        })
    })
})