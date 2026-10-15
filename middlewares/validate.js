import User from '../models/User.js';
export const validateFields = (req, res, next) => {
  const { id, name, email, password } = req.body;
  if (!id || !name || !email || !password) {
    return res.status(400).json({ message: 'כל השדות הם שדות חובה!' });
  }
  next();
};
export const validateID = (req, res, next) => {
  const { id } = req.body;
  const idStr = String(id).trim();
  if (idStr.length !== 9 || isNaN(idStr)) {
    return res.status(400).json({ message: 'תעודת זהות חייבת להכיל בדיוק 9 ספרות' });
  }
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let digit = Number(idStr[i]);
    let weight = (i % 2 === 0) ? 1 : 2;
    let step = digit * weight;
    if (step > 9) step -= 9;
    sum += step;
  }
  if (sum % 10 !== 0) {
    return res.status(400).json({message: 'תעודת זהות אינה תקינה' });
  }
  next();
};
export const checkUserExists = async (req, res, next) => {
  try {
    const { email, id } = req.body;
    
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({message: 'אימייל זה כבר רשום במערכת'});
    }

    const existingId = await User.findByPk(id);
    if (existingId) {
      return res.status(409).json({message: 'תעוד זהות זו כבר רשומה במערכת'});
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בבדיקת נתוני משתמש' });
  }
};