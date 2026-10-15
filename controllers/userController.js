import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendWelcomeEmail } from '../config/mail.js';
export const register = async (req, res) => {
  try {
    const { id, name, email, birthDate, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      id,
      name,
      email,
      birthDate,
      password: hashedPassword
    });
    sendWelcomeEmail(email, name);
    return res.status(201).json({
      message: 'משתמש נרשם בהצלחה!',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: '.שגיאה פנימית ברישום משתמש' });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'נא להזין אימייל וסיסמה' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '3h' }
    );
    return res.status(200).json({
      message: 'התחברת בהצלחה!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'שגיאה פנימית בהתחברות' });
  }
};