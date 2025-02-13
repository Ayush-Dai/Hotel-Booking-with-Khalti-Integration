// const express= require("express");
// const router= experss.Router();
// const User= require("../models/user")

// router.post("/register", async (req, res)=>{
// const newuser= new User({name : req.body.name, email : req.body.email, password : req.body.password})

// try {
//     const user=await newuser.save()
//     res.send('User Registerd Successfully')
// } catch (error) {
//     return res.status(400).json({error})
// }
// });


// router.post("/login",async (req,res)=>{
//     const {email, password}=req.body
//     try {
//         const user=await User.findone({email: email, password: password})
//     if(user){
//         res.send(user)
//     }else{
//         return res.status(400).json({message : 'Login failed'}) ;
//     }
//     } catch (error) {
//         return res.status(400).json({error})
        
//     }
// })

// module.exports=router

const express = require("express");
const router = express.Router(); // Correct the typo in `experss`
const User = require("../models/user"); // Ensure the `User` model is defined correctly

// Register Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Validate incoming data
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newUser = new User({ name, email, password });

  try {
    const user = await newUser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Registration failed.", error });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate incoming data
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Note: Corrected `findone` to `findOne` (case sensitivity issue)
    const user = await User.findOne({ email: email, password: password });

    if (user) {
        const temp={
            name: user.name,
            email: user.email,
            isAdmin : user.isAdmin,
            _id: user._id,
        }
      res.send(temp); // Return user details or a token as per your app's requirements
    } else {
      return res.status(401).json({ message: "Login failed. Invalid credentials." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "An error occurred during login.", error });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "An error occurred fetching users.", error });
  }
});

router.delete('/delete/:id', async(req,res)=>{
  try{
const getId= req.params.id;
const userDeleted= await User.findByIdAndDelete(getId);
if(userDeleted){
  res.status(200).json({
    success : true,
    message :'user deleted successfully',
    data : userDeleted
  })
}else{
  res.status(404).json({
    success : false,
    message : 'User not found'
  })
}
  }catch(error){
    res.status(500).json({
      success : false,
      message :'Please try again'
    })
  }
})

module.exports = router;
