import nc from "next-connect";
import bcrypt from "bcrypt";
import { validateEmail } from "../../../utils/validation";
import db from "../../../utils/db";
import User from "../../../models/User";
import { createActivationToken, createResetToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";
import { resetEmailTemplate } from "@/emails/resetEmailTemplate";
const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "האימייל הזה לא קיים" });
    }
    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
    sendEmail(email, url, "", "לאפס את הסיסמה שלך", resetEmailTemplate);
    await db.disconnectDb();
    res.json({
      message: "נשלח אליך אימייל, השתמש בו כדי לאפס את הסיסמה שלך",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
