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
const urlproject = "/projects";
const urlprojecttask = "/projects/setTask";
var newProject = "Test Yuli";
const userTest = "Manuelito21";
var UserId = "5f19c16d332f2635fdb68a45";
var ProjectId = "";
var TaskId = "";
// load the server to test

describe('Project controller: ', () => {

    before(function (done) {
        var mg = require('mongoose');

        require("../../api/models/userModel");
        require("../../api/models/taskModel");
        require("../../api/models/projectModel");


        var User = mg.model('Users');
        var Project = mg.model('Projects'),
            Task = mg.model('Tasks');


        mg.Promise = global.Promise;
        mg.connect(parameters.settingsGlobal.urlDatabase);

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

                        Task.create({ name: "Task test unit", User: user._id }, function (err, task) {
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

        it('should insert a new project that no exists for the  user', (done) => {
            chai.request(url)
                .post(urlproject)
                .send({ name: newProject, User: UserId })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', true);
                });
            done();

        });

        it('should be false if project with user  no have name ', (done) => {
            chai.request(url)
                .post(urlproject)
                .send({ name: "", User: UserId })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', false);
                });
            done();
        });

        it('should be false if project user not exists', (done) => {
            chai.request(url)
                .post(urlproject)
                .send({ name: newProject, User: "" })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    // expect false if user exists
                    expect(res.body).to.have.property('success', false);
                });
            done();
        });


        it('should respond false if project exists with the same user ', (done) => {
            chai.request(url)
                .post(urlproject)
                .send({ name: newProject, User: UserId })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', false);
                    done();
                });
         
        });


        it('should respond true if project add task if exists ', (done) => {
           
            chai.request(url)
                .post(urlprojecttask)
                .send({ Task: TaskId, Project: ProjectId })
                .end(function (err, res) {
                    expect(res).to.have.status(200);                    
                    // valida que el ingreso sea correcto
                    expect(res.body).to.have.property('success', true);
                    // verify that object  Task_id  equal TaskId
                  //expect(res.body.data).to.have.deep.property('_id', TaskId);
                  done();

                });

          
        });


        it('should respond false if project add task if not exists ', (done) => {
            chai.request(url)
                .post(urlprojecttask)
                .send({ Task: "", Project: ProjectId })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    // valida que el ingreso sea correcto
                    expect(res.body).to.have.property('success', false);
                    done();
                });
           
        });

    });

});


