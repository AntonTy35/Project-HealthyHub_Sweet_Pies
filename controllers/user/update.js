const { 
  updateContactService,
} = require("../../services/userPsIndicatorService");



const {  
  updateUserPsIndicatorsSchema,
} = require("../../utils/validation/validationUserPsIndicators");


const updateContact = async (req, res, next) => {
  const response = updateUserPsIndicatorsSchema.validate(req.body, {
    abortEarly: false,
  });

  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .send(response.error.details.map((err) => err.message).join(", "));
  }

  const owner = req.user.id;
  console.log("це contact Controller - updateContact", { owner }, req.user.id);

  const renewedTask = await updateContactService(owner, req.body);
  res.status(200).json(renewedTask);

  console.log("це contact Controller - updateContact", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
};

module.exports = {  
  updateContact,
};
