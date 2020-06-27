
const Easy = require('../models/easy-model')


createEasy = (req, res) => {
      const body = req.body
      if (!body) {
          return res.status(400).json({
              success: false,
              error: 'You must provide Information',
          })
      }
      const easy = new Easy(body)

      if (!easy) {
          return res.status(400).json({ success: false, error: err })
      }

      easy
          .save()
          .then(() => {
              return res.status(201).json({
                  success: true,
                  id: easy._id,
                  message: 'Easy created!',
              })
          })
          .catch(error => {
              return res.status(400).json({
                  error,
                  message: 'Easy not created!',
              })
          })
};

getEasys = async(req, res) => {
  await Easy.find({}, (err, easys) => {
      if (err) {
            return res.status(400).json({ success: false, error: err })
      }
      if (!easys.length) {
          return res.status(404)
              .json({ success: false, error: `Easy not found` })
      }
      return res.status(200).json({ success: true, data: easys})
  }).catch(err => console.log(err))
};


module.exports = {
    createEasy,
    getEasys
}
