const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// const orm = require('./model');
// var Users = orm.model('public.users');
const db = require('./db');

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  console.log(id);
  // User.findOne(id).success(function(user) { done(null, user) })
})

passport.use(new LocalStrategy(function(empId, password, done) {
  console.log('LocalStrategy');
  console.log(empId, password);
  db.one('select * from Users where empId = $1', empId)
    .then((results) => {
      console.log('results', results);
    })
  // Users.find({ where: { empId: empId } }).then(function(err, user) {
  //   if(err) { return done(err) }
  //   if(!user) { return done(null, false, { message: 'Incorrect employee Id' }) }
  //   if(user.password !== password) { return done(null, false, { message: 'Incorrect password' }) }
  //   return done(null, user)
  // })
}))

module.exports = passport
