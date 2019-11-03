import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';

chai.use(chaiHttp);
chai.should();

describe("dependencies server should", () => {
    it("respond Not-Found error when getting non-existing package", (done) => {
        chai.request(server)
            .get('/dependecies')
            .query({package: 'somePackage'})
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});
