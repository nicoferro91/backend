const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const ContenedorLogin = require("../daos/LoginDaoMongoDB")
const User = new ContenedorLogin()

User.getAll().then(users => {
    console.log("estoy intentando obtener mis usuarios: ", users)
})

// ---------------------- Utils -----------------------
const isValidPassword = (mail, password) => {
    return bcrypt.compareSync(password, mail.password)
}

const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

// ----------------- Serializers ----------------------
passport.serializeUser(function (user, done) {
    console.log("serialize")
    done(null, user._id)
})

passport.deserializeUser(async function (id, done) {
    console.log("deserialize")
    await User.getById(id, done)
})

// ------------- Passport Middlewares -----------------
passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password"
        },
        async (username, password, done) => {
            let user = await User.getByUser(username)

            if (!user) {
                console.log(`No existe el usuario ${username}`)
                done(null, false)
            }
            if (!isValidPassword(user, password)) {
                console.log("Password incorrecto")
                done(null, false)
            }

            done(null, user)
        }
    )
)

passport.use(
    "register",
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        async (username, password, done) => {
            try {
                let user = await User.getByUser(username)

                if (user) {
                    console.log(`El usuario ${username} ya existe`)
                    return done(null, user.username, { message: "user ya existe" })
                } else {
                    const newUser = new User()
                    newUser.username = username
                    newUser.password = createHash(password)
                    try {
                        await User.save(newUser)
                    } catch (error) {
                        console.error(error)
                    }

                    return done(null, newUser.username)
                }
            } catch (error) {
                console.error(error)
            }
        }
    )
)

module.exports = passport