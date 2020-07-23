var responseObject = new Object();
var obj = {};
responseObject.Success= function (data, message) {  
   return  setData(true,data, message);
}

responseObject.error= function (data, message) {
    return  setData(false,data, message);
}

function setData(flag, data, message){
    obj.success = flag;   
    obj.message = message;   
    obj.data = data;
    return obj;
}


module.exports = responseObject;