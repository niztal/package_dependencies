import chai from 'chai';
import chaiHttp from 'chai-http';
import moxios from 'moxios';
import server from '../src/server';

chai.use(chaiHttp);
chai.should();

const npmURL = "https://registry.npmjs.org"; //TODO: move to config file

describe("dependencies server should", () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("respond Not-Found error when getting non-existing package", (done) => {
        const somePackage = "somePackage";
        moxios.stubRequest(`${npmURL}/${somePackage}/latest`, {
            status: 404
        });
        chai.request(server)
            .get('/dependencies')
            .query({pkg: somePackage})
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});
