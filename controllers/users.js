const User  = require("../models/user.js")


module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs")
};
module.exports.signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.flash("success", "User was registered");
        res.redirect("/listings");
    } catch (error) {
        req.flash("error", error.message);
        req.redirect("/signup");
    }

};


module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs")
};
module.exports.login = async (req, res) => {
    req.flash("success", "welcome to wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    })
};