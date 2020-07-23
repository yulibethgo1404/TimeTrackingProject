var asserts = require('assert');
var parameters = require("../../package.json");
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var chai = require("chai");
chai.use(chaiHttp);
// url server when load the project
const url = parameters.settingsGlobal.urlServer;
//chai.use(chaiAsPromised);
chai.should();
const utltask = "/tasks";
const urltaskTime = "/tasks/timetask";
var newProject = "Test Yuli";
const userTest = "Manuelito21";
var UserId = "";
var ProjectId = "";
var TaskId = "";
var taskName = "Task test";
// load the server to test

var mg = require('mongoose');

require("../../api/models/userModel");
require("../../api/models/taskModel");
require("../../api/models/projectModel");
require("../../api/models/timeTaskModel");


var User = mg.model('Users');
var Project = mg.model('Projects'),
    Task = mg.model('Tasks'),
    Task = mg.model('timeTasks');

describe('Task controller: ', () => {

    before(function (done) {

        mg.Promise = global.Promise;
        mg.connect(parameters.settingsGlobal.urlDatabase);

        // load info test
        User.remove({},
            function () {
                new User({ username: userTest }).save(function (err, user) {
                    if (err) console.log(err);

                    if (user) {
                        UserId = user._id;                       
                       Project.create({ name: newProject + "_1", User: UserId }, function (err, project) {
                            if (err) console.log(err);

                            if (project)
                                ProjectId = project._id;


                        });           

                        Task.create({ name: "Task test unit", User: user._id , Project: ProjectId}, function (err, task) {
                            if (err) console.log(err);
                            if (task)
                                TaskId = task._id;                            
                            done();
                        });

                    
                    }

                });

            });

     /*   if (mg.connection.db) {
            mg.connection.close();
            console.log("close connection success");
        }*/
        
    });


    describe('Project  controller: ', () => {

       it('should insert a new Task if user exists and project null', (done) => {          
            chai.request(url)
                .post(utltask)
                .send({ name: taskName, User: UserId })
                .end(function (err, res) {                   
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', true);
                });
            done();

        });
       it('should insert a new Task if user exists and project null and set a time manual', (done) => {
            chai.request(url)
                .post(utltask)
                .send({ name: taskName, User: UserId , timeTotal: 10})
                .end(function (err, res) {
                    console.log(res.body);
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', true);
                    //expect(res.body).to.have.property('success', true);
// debe validar la creacion de la tarea con total timte eguql to 10 and Times has a new record 
                    console.log(res.body);
                });
            done();

        });

      it('should insert a new Task if use exists and name task is empty and project null ', (done) => {
            chai.request(url)
                .post(utltask)
                .send({ name: "", User: UserId })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', true);
                });
            done();
        });
 
        it('should be false if task user not exists', (done) => {
            chai.request(url)
                .post(utltask)
                .send({ name: taskName, User: "" })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    // expect false if user exists
                    expect(res.body).to.have.property('success', false);
                });
            done();
        });


        // faltan muchas pruebas que el tiempo no permitio
    });

});


