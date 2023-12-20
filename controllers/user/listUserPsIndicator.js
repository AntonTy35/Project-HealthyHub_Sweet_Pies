const {
  listContactsService,  
} = require("../../services/userPsIndicatorService");


const listContacts = async (req, res, next) => {
  const tasks = await listContactsService(req, res, next);
  res.status(200).json(tasks);

  console.log("це contact Controller - listContacts", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
};

module.exports = {
  listContacts,  
};
