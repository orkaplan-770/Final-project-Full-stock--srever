import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'גישה נדחתה, חסר טוקן אימות' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'טוקן לא תקין או שפג תוקפו' });
  }
};