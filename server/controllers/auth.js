const User = require('../models/user')

exports.createOrUpdateUser = async (req, res) => {
   const {name, picture, email} = req.user;

   const user = await User.findOneAndUpdate(
       {email},
        {name: email.split('@')[0], picture},
         {new: true}
         );

   if(user) {
       console.log('USER UPDATE', user);
       res.json(user)
   }else{
       const newUser = await new User({
           email,
           name: email.split('@')[0],
           picture,
       }).save();
       console.log('USER UPDATE', newUser);
       res.json(newUser);
   }
};
