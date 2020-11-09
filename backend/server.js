const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose');
const jobsRoutes = express.Router();
const applyRoutes = express.Router();
const editRoutes = express.Router();
const passport = require("passport");
const users = require("./routes/api/users");
const Jobs = require('./models/jobs.model');
const Apply = require('./models/apply.model');
const User = require('./models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");
const validateUpdateInput = require("./validation/update");
const { json } = require('body-parser');
app.use(cors());

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());
  
  // DB Config
  const db = require("./config/keys").mongoURI;

mongoose.connect('mongodb://127.0.0.1:27017/jobboard', { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})
    
jobsRoutes.route('/').get(function(req, res){
    Jobs.find(function(err, job) {
        if (err) {
            console.log(err)
        }
        else {
            res.json(job);
        }
    });
});

applyRoutes.route('/').get(function(req, res){
    Apply.find(function(err, apply) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(apply);
        }
    });
});

editRoutes.route('/').get(function(req, res){
    User.find(function(err, edit) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(edit);
        }
    });
});

jobsRoutes.route('/:id').get(function (req, res){
    let id = req.params.id;
    Jobs.findById(id, function(err, job) {
        res.json(job);
    });
});

applyRoutes.route('/:id').get(function (req, res){
    let id = req.params.id;
    Apply.findById(id, function(err, apply) {
        res.json(apply);
    });
});

editRoutes.route('/:id').get(function (req, res){
    let id = req.params.id;
    User.findById(id, function(err, edit) {
        res.json(edit);
    });
});

jobsRoutes.route('/add').post(function(req, res){
    let job = new Jobs(req.body);
    job.save()
        .then(job => {
            res.status(200).json(job);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

applyRoutes.route('/add').post(function(req, res){
    let apply = new Apply(req.body);
    apply.save()
        .then(apply => {
            res.status(200).json({'Apply': 'Application added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new application failed');
        });
});

jobsRoutes.route('/update/:id').put((req, res, next) => {
    if (!res)
    res.status(404).send('data is not found');
    Jobs.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('Job updated successfully !')
      }
    })
})

// Update apply
applyRoutes.route('/update/:id').put((req, res, next) => {
    if (!res)
    res.status(404).send('data is not found');
    Apply.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, 

    (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('Apply updated successfully !')
      }
    })
})

// Update user
editRoutes.route('/update/:id').put((req, res, next) => {
    const { errors, isValid } = validateUpdateInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email} && { _id: req.body._id}).then(user => {
        if (user) {
            console.log(user)
            User.findByIdAndUpdate(req.params.id, {
        
                $set: req.body
              }, (error, user) => {
                if (error) {
                  return next(error);
                }
                else {
                  bcrypt.genSalt(10, (err, salt) => {
                      bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user
                          .save()
                          .then(user => res.json(user))
                          .catch(err => console.log(err));
                      });
                  });
                  console.log('User updated successfully !')
                }
              });
        }
        else {
          console.log(user)
          return res.status(400).json({ email: "Email already exists" });
        }
    })
})

// Delete apply
applyRoutes.route('/delete/:id').delete((req, res, next) => {
    if (!res)
    res.status(404).send('data is not found');
    Apply.findByIdAndDelete(req.params.id, {
      $set: req.body
    }, 

    (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else 
      {
        res.json(data)
        console.log('Apply Deleted successfully !')
      }
    })
})

// Delete job
jobsRoutes.route('/delete/:id').delete((req, res, next) => {
    if (!res)
    res.status(404).send('data is not found');
    Jobs.findByIdAndDelete(req.params.id, {
      $set: req.body
    }, 

    (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else 
      {
        res.json(data)
        console.log('Job Deleted successfully !')
      }
    })
})

// Delete job
editRoutes.route('/delete/:id').delete((req, res, next) => {
    if (!res)
    res.status(404).send('data is not found');
    User.findByIdAndDelete(req.params.id, {
      $set: req.body
    }, 

    (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else 
      {
        res.json(data)
        console.log('User Deleted successfully !')
      }
    })
})


// jobsRoutes.route('/delete/:id').delete(function(req,res){
//     Jobs.findByIdAndDelete(req.params.id, function(err, job) {
//         if (!job)
//         res.status(404).send('data is not found');
//         else
//         job.ad = req.body.ad;

//         job.delete().then(job => {
//             res.json('Job deleted');
//         })
//         .catch(err => {
//             res.status(400).send("Delete not possible");
//             err.json('Delete impossible')
//         });
//     });
// });

// applyRoutes.route('/delete/:id').delete(function(req,res){
//     Apply.findById(req.params.id, function(err, apply) {
//         if (!apply)
//         res.status(404).send('data is not found');
//         else
//         apply.ad = req.body.ad;

//         apply.delete().then(res => {
//             res.json('Application deleted');
//         })
//         .catch(err => {
//             res.status(400).send("Delete not possible");
//             err.json('Delete impossible')
//         });
//     });
// });

// editRoutes.route('/delete/:id').delete(function(req,res){
//     User.findById(req.params.id, function(err, user) {
//         if (!user)
//         res.status(404).send('data is not found');
//         else
//         user.ad = req.body.ad;

//         user.delete().then(user => {
//             res.json('User deleted');
//         })
//         .catch(err => {
//             res.status(400).send("Delete not possible");
//         });
//     });
// });

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/users", editRoutes);
app.use ('/jobs', jobsRoutes);
app.use ('/apply', applyRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT)
});

