
const Config = require('../models/config-model');


getConfigs = async(req, res) => {

  console.log("getConfigs2 ", req.query, req.params)

  await Config.find({}, (err, configs) => {
      if (err) {
            return res.status(400).json({ success: false, error: err })
      }
      if (!configs.length) {
          return res.status(404).json({ success: false, error: `Config/Contact not found` })
      }
      return res.status(200).json({ success: true, data: configs})
  })
};

getConfig = async(req, res) => {

  console.log("getConfig ", req.query)

  await Config.find(req.query, (err, config) => {
      if (err) {
        console.log(err)
            return res.status(400).json({ success: false, error: err })
      }
      if (!config.length) {
        console.log("not found")
          return res.status(404).json({ success: false, error: `Config not found` })
      }
      return res.status(200).json({ success: true, data: config})
  })
};

updateConfig = async(req, res) => {
  const body = req.body
  const sections = req.body.sections
//  const sections = req.body.param.sections

  console.log("sections" , sections);

  //const sections = body.sections;
  console.log("query ", req.query.website);

  if (!body) {

      return res.status(400).json({
          success: false,
          error: 'You must provide a body to update',
      })
  }

  Config.findOne({website: req.query.website}, (err, config) => {
      if (err) {
            return res.status(400).json({ success: false, error: err })
      }

      config.sections = body.sections
console.log(config)

     config
      .save()
      /*
       { "_id": configRet._id},
       {$set: {"sections.$[]": sections}},
       {upsert : true}
      )
      */
        .then(() => {
            return res.status(200).json({
                success: true,
                id: config._id,
                message: 'Config updated!',
            })
        })
        .catch(error => {
          console.log("error",error)
            return res.status(404).json({
                error,
                message: 'Config not updated!',
            })
        })


      })


  };



  createConfig = (req, res) => {
        const body = req.body
        console.log("body", body);
        if (!body) {
            console.log("failure no body");

            return res.status(400).json({
                success: false,
                error: 'You must provide Information',
            })
        }
        const config = new Config(body)

        if (!config) {
          console.log("failure", err);
            return res.status(400).json({ success: false, error: err })
        }

        config
            .save()
            .then(() => {
              console.log("success")
                return res.status(201).json({
                    success: true,
                    id: config._id,
                    message: 'Config created!',
                })
            })
            .catch(error => {
              console.log(error);
                return res.status(400).json({
                    error,
                    message: 'Config not created!',
                })
            })
  };
  deleteConfig= async (req, res) => {
    console.log("req",req.query)
      await Config.findOneAndDelete(req.query , (err, config) => {
          if (err) {
              return res.status(400).json({ success: false, error: err })
          }

          if (!config) {
              return res
                  .status(404)
                  .json({ success: false, error: `Config not found` })
          }

          return res.status(200).json({ success: true, data: config })
      }).catch(err => console.log(err))
  }


module.exports = {
    createConfig,
    getConfigs,
    updateConfig,
    getConfig,
    deleteConfig
}
