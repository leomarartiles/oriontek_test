var express = require("express");
var bodyParser = require("body-parser");
var urlencodeParser = bodyParser.urlencoded({ extended: false });
const dotenv = require('dotenv').config();
var validator = require("express-validator");

var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

var apiToken,apiTokenSecret;
// This sets the mock adapter on the default instance
// var mock = new MockAdapter(axios);

 let submitLogin = function (user_email,user_password){
  return new Promise(function(resolve, reject){
    axios.post(process.env.APP_URL_API+'/users/auth/', { user_email: user_email,user_password:user_password})
    .then(function (response) {
      resolve(response);
    })
    .catch(function (error) {
      // console.log('error', error);
    });
  });
}

// let submitNewGroup = function (form_data){
//   return new Promise(function(resolve, reject){
//     //JSON.parse(form_data)
//     axios.post(process.env.APP_URL_API+'/groups/create/', form_data,apiToken)
//     .then(function (response) {
//       resolve(response);
//     })
//     .catch(function (error) {
//       console.log('error', error);
//     });
//   });
// }
let getAppFieldData = function (){
  return new Promise(function(resolve, reject){
    axios.get(process.env.APP_URL_API+'/companies/listing',apiToken)
    .then(function (response) {
      resolve(response);
    })
    .catch(function (error) {
      console.log('error', error);
    });
  });
}
// let getAppGroupsdData = function (companyId){
//   return new Promise(function(resolve, reject){
//     axios.post(process.env.APP_URL_API+'/group/get/',{company_id:companyId},apiToken)
//     .then(function (response) {
//       resolve(response);
//     })
//     .catch(function (error) {
//       console.log('error', error);
//     });
//   });
// }
// let getSectionDepartment = function (department_id){
//   return new Promise(function(resolve, reject){
//     axios.get(process.env.APP_URL_API+'/section/'+department_id,apiToken)
//     .then(function (response) {
//       resolve(response);
//     })
//     .catch(function (error) {
//       console.log('error', error);
//     });
//   });
// }
class VehiclesServices{
  constructor(toeknUrl,tokenSecurity){

  }

  static getRecord = function (vehicle_id){
    return new Promise(function(resolve, reject){
      axios.get(process.env.APP_URL_API+'/vehicle/'+vehicle_id,apiToken)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
      });
    });
  }
  static getRecordCIA = function (record_id){
    return new Promise(function(resolve, reject){
      axios.post(process.env.APP_URL_API+'/vehicle/cia/',{company_id:record_id},apiToken)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
      });
    });
  }
  static getListingDT= function (req){
    // console.log('req',req.body)
    return new Promise(function(resolve, reject){
      axios.post(process.env.APP_URL_API_AUTH+'/vehicles/list/bo',req.body,apiToken)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        // console.log('error', error);
      });
    });
  }
  static updateRecord = function (vehicle_id,form_data){
    return new Promise(function(resolve, reject){
      axios.post(process.env.APP_URL_API+'/vehicle/update/'+vehicle_id, form_data,apiToken)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
      });
    });
  }
  static createNewRecord = function (form_data){
    return new Promise(function(resolve, reject){
      axios.post(process.env.APP_URL_API+'/vehicle/create', form_data,apiToken)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
      });
    });
  }
}

class TrackingServices{
    constructor(toeknUrl,tokenSecurity){

    }

    static getRecord = function (token_url){
      return new Promise(function(resolve, reject){
        axios.get(process.env.APP_URL_API+'/tracking-tokenid/'+token_url,apiToken)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          console.log('error', error);
        });
      });
    }
}

class UsersServices {
  constructor(a,b,c) {}
  
  static getRecord = function (record_id) {
    return new Promise(function (resolve, reject) {
      axios.get(process.env.APP_URL_API + '/user/' + record_id, apiToken)
      .then(function (response) {
        resolve(response);
      }).catch(function (error) {
        console.log('error', error);
      });
    });
  };

  static updateRecord = function (record_id, form_data) {
    return new Promise(function (resolve, reject) {
      axios.post(process.env.APP_URL_API + '/user/update/' + record_id, form_data)
      .then(function (response) {
        resolve(response);
      }).catch(function (error) {
        console.log('error', error);
      });
    });
  };

  static createNewRecord = function (form_data) {
    return new Promise(function (resolve, reject) {
      axios.post(process.env.APP_URL_API + '/user/create', form_data)
        .then(function (response) {
          resolve(response);
        }).catch(function (error) {
          console.log('error', error);
      });
    });
  };
}

class GroupsServices {
  constructor(a,b,c) {}
  
  static getRecord = function (record_id) {
    return new Promise(function (resolve, reject) {
      axios.get(process.env.APP_URL_API + '/group/' + record_id, apiToken)
      .then(function (response) {
        resolve(response);
      }).catch(function (error) {
        console.log('error', error);
      });
    });
  };

  static updateRecord = function (record_id, form_data) {
    return new Promise(function (resolve, reject) {
      axios.post(process.env.APP_URL_API + '/group/update/' + record_id, form_data)
      .then(function (response) {
        resolve(response);
      }).catch(function (error) {
        console.log('error', error);
      });
    });
  };

  static createNewRecord = function (form_data) {
    return new Promise(function (resolve, reject) {
      axios.post(process.env.APP_URL_API + '/group/create', form_data)
        .then(function (response) {
          resolve(response);
        }).catch(function (error) {
          console.log('error', error);
      });
    });
  };
}

class CompaniesServices {
  constructor(a,b,c) {}

  static createCompanyDT = function (form_data){
    return new Promise(function(resolve, reject){
      axios.post(process.env.APP_URL_API+'/companies/create', form_data,apiToken)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
      });
    });
  }
  static getCompanyList = function (req){
    return new Promise(function(resolve, reject){
      axios.post(process.env.APP_URL_API+'/companies/list/dt',req,apiToken)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
      });
    });
  }
  static getListingDT= function (req){
    return new Promise(function(resolve, reject){
      axios.post(process.env.APP_URL_API+'/companies/list/dt',req.body,apiToken)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
      });
    });
  }
  
  static getCompanyByID = function (recordIDs){
    return new Promise(function(resolve, reject){
      axios.get(process.env.APP_URL_API+'/companies/info/'+recordIDs,apiToken)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
      });
    });
  }
  
  static updateCompanyDT = function (recordIDs,form_data){
    return new Promise(function(resolve, reject){
      axios.post(process.env.APP_URL_API+'/companies/update/'+recordIDs, form_data,apiToken)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
      });
    });
  }
}

class ClientServices {
  constructor(a,b,c) {}

  static createNewRS = function (form_data){
    return new Promise(function(resolve, reject){
      axios.post(process.env.APP_URL_API+'/clients/create', form_data,apiToken)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
      });
    });
  }
  static getRecordID = function (recordIDs){
    return new Promise(function(resolve, reject){
      axios.get(process.env.APP_URL_API+'/clients/info/'+recordIDs,apiToken)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
      });
    });
  }
  
  static updateRecordId = function (recordIDs,form_data){
    return new Promise(function(resolve, reject){
      axios.post(process.env.APP_URL_API+'/clients/update/'+recordIDs, form_data,apiToken)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
      });
    });
  }
  
  static getListingDT= function (req){
    // console.log('req',req.body)
    return new Promise(function(resolve, reject){
      axios.post(process.env.APP_URL_API+'/clients/list/dt',req.body,apiToken)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        // console.log('error', error);
      });
    });
  }
 
}

module.exports = function (app) {
  // Inner Auth
  app.get("/pages-login", function (req, res) {
    res.locals = { title: "Login 1" };
    res.render("AuthInner/pages-login");
  });
  
  app.get("/login", function (req, res) {
    res.render("Auth/auth-login", {
      message: req.flash("message"),
      error: req.flash("error"),
    });
  });
  
  // app.get('/t', function (req, res) {
    
  //   res.locals.query = req.query;
  //   if( req.query.t !=''){
      
  //     TrackingServices.getRecord(req.query.t).then(function(response){
  //         if (response.data.status =='ok') {
  //           if(response.data.data.length > 0){
  //             res.locals.app_form_data=response.data.data[0];
  //             // console.log('res',res.locals.app_form_data);
  //             res.render('Tracking/map-tracking');
  //           }else{
  //             res.redirect('/pages-expired');
  //             // res.render('Tracking/map-tracking');
  //           }
  //         } else {
  //           req.flash("error", "Error connection with server!");
  //           res.send({status:'error',message:response.data.status});
  //         }
  //     });
  //   }
  // });

  app.post("/auth-login", urlencodeParser, function (req, res) {
    submitLogin(req.body.user_email,req.body.user_password).then(function(response){
      
        if (response.data.status =='ok') {
          sess = req.session;
          sess.user = response.data.data.user_email;
          sess.user_fullname = response.data.data.user_firstname+' '+response.data.data.user_lastname;
          sess.user_token = response.data.token;
          apiTokenSecret=response.data.token;
          apiToken= {headers: {'Authorization': `Bearer ${response.data.token}` } };
          res.send({status:'ok',data:{user_login:response.data.data.user_login,user_email:response.data.data.user_email,user_fullname:response.data.data.user_firstname+' '+response.data.data.user_lastname,user_token:response.data.token}});
        } else {
          req.flash("error", "Incorrect email or password!");
          res.send({status:'error',message:response.data.status});
        }
    });
    
  });

  app.get('/pages-expired', function (req, res) {
		res.locals = { title: 'Expiracion de Enlace' };
		res.render('Pages/pages-expired');
	});
  app.get("/app-fields",urlencodeParser, function (req, res) {
    getAppFieldData().then(function(response){
        if (response.data.status =='ok') {
          res.send({status:'ok',data:response.data.data});
        } else {
          req.flash("error", "Error connection with server!");
          res.send({status:'error',message:response.data.status});
        }
    });
  });

  app.post("/user",urlencodeParser, function (req, res) {
    UsersServices.getRecord(req.body.record_id).then(function(response){
        if (response.data.status =='ok') {
          res.send({status:'ok',data:response.data.data});
        } else {
          req.flash("error", "Error connection with server!");
          res.send({status:'error',message:response.data.status});
        }
    });
  });
  
  app.post("/user/update",urlencodeParser, function (req, res) {
    UsersServices.updateRecord(req.body.id,req.body).then(function(response){
        if (response.data.status =='ok') {
          res.send({status:'ok',data:response.data.data});
        } else {
          req.flash("error", "Error connection with server!");
          res.send({status:'error',message:response.data.status});
        }
    });
  });
  
  app.post("/user/create",urlencodeParser, function (req, res) {
    UsersServices.createNewRecord(req.body).then(function(response){
        if (response.data.status =='ok') {
          res.send({status:'ok',data:response.data.data});
        } else if(response.data.status =='found') {
          res.send({status:'found',message:'Identificador ya existe!'});
        } else {
          req.flash("error", "Error connection with server!");
          res.send({status:'error',message:response.data.status});
        }
    });
  });
  
  
  app.post("/company/list",urlencodeParser, function (req, res) {
    CompaniesServices.getListingDT(req).then(function(response){
        if (response.data.status =='ok') {
          res.send(response.data);
        } else {
          req.flash("error", "Error connection with server!");
          res.send({status:'error',message:response.data.status});
        }
    });
  });
  
  
  
  app.post("/company/create",urlencodeParser, function (req, res) {
    CompaniesServices.createCompanyDT(req.body).then(function(response){
        if (response.data.status =='ok') {
          res.send({status:'ok',data:response.data.data});
        } else if(response.data.status =='found') {
          res.send({status:'found',message:'Identificador ya existe!'});
        } else {
          req.flash("error", "Error connection with server!");
          res.send({status:'error',message:response.data.status});
        }
    });
  });
  
  app.post("/company",urlencodeParser, function (req, res) {
    CompaniesServices.getCompanyByID(req.body.record_id).then(function(response){
        if (response.data.status =='ok') {
          res.send({status:'ok',data:response.data.data});
        } else {
          req.flash("error", "Error connection with server!");
          res.send({status:'error',message:response.data.status});
        }
    });
  });
  
  app.post("/company/update",urlencodeParser, function (req, res) {
    CompaniesServices.updateCompanyDT(req.body.id_reg,req.body).then(function(response){
        if (response.data.status =='ok') {
          res.send({status:'ok',data:response.data.data});
        } else {
          req.flash("error", "Error connection with server!");
          res.send({status:'error',message:response.data.status});
        }
    });
  });


  app.post("/customers/list",urlencodeParser, function (req, res) {
    ClientServices.getListingDT(req).then(function(response){
        if (response.data.status =='ok') {
          res.send(response.data);
        } else {
          req.flash("error", "Error connection with server!");
          res.send({status:'error',message:response.data.status});
        }
    });
  });
  
  app.post("/customers",urlencodeParser, function (req, res) {
    ClientServices.getRecordID(req.body.record_id).then(function(response){
        if (response.data.status =='ok') {
          res.send({status:'ok',data:response.data.data});
        } else {
          req.flash("error", "Error connection with server!");
          res.send({status:'error',message:response.data.status});
        }
    });
  });
  
  app.post("/customers/update",urlencodeParser, function (req, res) {
    ClientServices.updateRecordId(req.body.id_reg,req.body).then(function(response){
        if (response.data.status =='ok') {
          res.send({status:'ok',data:response.data.data});
        } else {
          req.flash("error", "Error connection with server!");
          res.send({status:'error',message:response.data.status});
        }
    });
  });
  
  app.post("/customers/create",urlencodeParser, function (req, res) {
    ClientServices.createNewRS(req.body).then(function(response){
        if (response.data.status =='ok') {
          res.send({status:'ok',data:response.data.data});
        } else if(response.data.status =='found') {
          res.send({status:'found',message:'Identificador ya existe!'});
        } else {
          req.flash("error", "Error connection with server!");
          res.send({status:'error',message:response.data.status});
        }
    });
  });

  app.get("/logout", function (req, res) {
    // Assign  null value in session
    sess = req.session;
    sess.user = null;
    res.redirect("/login");
  });
};
