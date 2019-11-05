import chai from 'chai';
import chaiHttp from 'chai-http';
import moxios from 'moxios';
import server from '../src/server';

chai.use(chaiHttp);
chai.should();

const npmURL = "https://registry.npmjs.org"; //TODO: move to config file
const somePackage = "somePackage";

describe("dependencies server should", () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("respond Not-Found error when getting non-existing package", (done) => {
        moxios.stubRequest(`${npmURL}/${somePackage}/latest`, {
            status: 404
        });
        chai.request(server)
            .get('/dependencies')
            .query({package: somePackage})
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
    it("respond Bad Request when not getting package", (done) => {
        chai.request(server)
            .get('/dependencies')
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it("respond dependencies for latest version", (done) => {
        const expectedResponse = {
            dependencies: {
                "dep_a": "1.5.10",
                "dep_b": "^2.0.2"
            },
            devDependencies: {
                "deb_c": "^4.17.1",
            }
        };
        moxios.stubRequest(`${npmURL}/${somePackage}/latest`, {
            status: 200,
            response: expectedResponse
        });
        chai.request(server)
            .get('/dependencies')
            .query({package: somePackage})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.eql(expectedResponse);
                done();
            });
    });
});
