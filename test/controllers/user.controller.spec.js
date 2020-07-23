var asserts = require('assert');
var parameters = require("../../package.json");
var mongoose = require('mongoose');
mongoose.model('Users', new mongoose.Schema());
var User = mongoose.model('Users');


var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var chai = require("chai");

var chaiHttp = require('chai-http');
chai.use(chaiHttp);

// url server when load the project
const url = parameters.settingsGlobal.urlServer;
//chai.use(chaiAsPromised);
chai.should();

const urluser = "/users";
const newusername = "Manuelito21";
describe('TimeTask controller: ', () => {

    before(function (done) {

        mongoose.connect(parameters.settingsGlobal.urlDatabase, function (error) {
            if (error) console.error('Error while connecting:\n%\n', error);
            User.findOneAndDelete({ username: newusername }, function (err) {
                if (err) console.log(err);
                console.log("userTest delete success");
            });

            done();
        });
    });

    after(function (done) {

        mongoose.connection.close(function () {
            done();
        });
        console.log("close connection success");
    });
    describe('USER controller: ', () => {
        it('should insert a new user that no exists', (done) => {
            chai.request(url)
                .post(urluser)
                .send({ username: newusername })
                .end(function (err, res) {

                    expect(res).to.have.status(200);
                    // valida que el ingreso sea correcto
                    expect(res.body).to.have.property('success', true);
                    done();
                });
        });

        it('should respond false if user exists', (done) => {
            chai.request(url)
                .post(urluser)
                .send({ username: newusername })
                .end(function (err, res) {

                    expect(res).to.have.status(200);
                    // valida que el ingreso sea correcto
                    expect(res.body).to.have.property('success', false);


                    done();
                });
        });

    });





});

