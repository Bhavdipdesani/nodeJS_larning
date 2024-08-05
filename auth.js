const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Parson = require('./models/Parson');

passport.use(new LocalStrategy(async (UserName, password, done) => {
    try {
        const user = await Parson.findOne({ username: UserName });
        if (!user) {
            return done(null, false, { message: "Incorrect username." });
        }

        const isPasswordMatch = user.comparePassword(password);
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: "Incorrect password." })
        }
    } catch (error) {
        done(error)
    }
}))


module.exports = passport;