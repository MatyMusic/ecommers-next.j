import nc from "next-connect";
import bcrypt from "bcrypt";
import { validateEmail } from "../../../utils/validation";
import db from "@/utils/db";
import User from "@/models/User";
import { createActivationToken } from "@/utils/tokens";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "בבקשה למלא את כל השדות" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'דוא"ל לא חוקי' });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'דוא"ל זה קיים כבר במערכת' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "סיסמא חייבת להיות לפחות שישה תווים" });
    }

    const bcryptPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: bcryptPassword });
    const addedUser = await newUser.save();
    const activation_token = createActivationToken({
      id: addedUser._id.toString(),
    });

    
    



    console.log(activation_token);
    res.send(activation_token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
