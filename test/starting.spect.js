
function preloadData() {

    var array = [{ username: 'usertest1' }, { username: 'usertest2' }];
    User.create(array, function(err){
      if(err) console.log(err);
  
      console.log("Users created");
    });
}  



function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

describe('TimeTracking Controller', function () {

//importTest("userController", './controllers/user.controller.spec');

//importTest("userController", './controllers/project.controller.spec');
importTest("userController", './controllers/task.controller.spec');

});
