const { User } = require("../../models/user");
const ctrlWrapper = require("../../helpers/ctrlWrapper");


const updateUser = ctrlWrapper(async (req, res, next) => {  
 
   const authHeader = req.headers["authorization"];
   const [bearer, token] = authHeader.split(" ", 2);
   const tasks = await User.find({ token }).exec();
   const task = { ...tasks };

   const tasksUserPs = await User.find(task[0]._id).exec();

   const taskUserPs = { ...tasksUserPs };
  
   const renewedUserId = taskUserPs[0]._id;  

  const renewedTask = req.body;  
  
  await User.findByIdAndUpdate(renewedUserId, renewedTask, {
    new: true,
  });  

  console.log("1.3 - це contact Controller - updateUser - оновлено", {
    renewedUserId,
  });  

  res.status(200).json(renewedTask);
  
});

module.exports = {
  updateUser,
};
