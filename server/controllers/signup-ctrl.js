
const Signup = require('../models/signup-model')




createSignup = (req, res) => {
    const body = req.body
    console.log(body);
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide Email',
        })
    }
    const signup = new Signup(body)

    if (!signup) {
        console.log("no signup")
        return res.status(400).json({ success: false, error: err })
    }

    signup
        .save()
        .then(() => {
            console.log("signed up")
            return res.status(201).json({
                success: true,
                id: signup._id,
                message: 'Signed up!',
            })
        })
        .catch(error => {
            console.log("not signed up")
            return res.status(400).json({
                error,
                message: 'Not signed up',
            })
        })
}
getSignups = async(req, res) => {
  await Signup.find({}, (err, easys) => {
      if (err) {
            return res.status(400).json({ success: false, error: err })
      }
      if (!easys.length) {
          return res.status(404)
              .json({ success: false, error: `Signup not found` })
      }
      return res.status(200).json({ success: true, data: easys})
  }).catch(err => console.log(err))
};


module.exports = {
    createSignup,
    getSignups
}
