import Message from '../models/Message.js';
export const createMessage = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'התוכן לא יכול להיות ריק' });
    }
    const newMessage = await Message.create({
      userId: req.userId,content
    });

    return res.status(201).json({
      message: 'הפנייה נשלחה בהצלחה!',
      data: newMessage
    });
  } catch (error) {
    return res.status(500).json({ message: 'שגיאה בשמירת הפנייה' });
  }
};
export const getMyMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { userId: req.userId }
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: 'שגיאה בשליפת הפנייה' });
  }
};
export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({ message: 'פנייה לא נמצאה' });
    }
    if (message.userId !== req.userId) {
      return res.status(403).json({ message: 'אין לך הרשאה לערוך את הפנייה.' });
    }
    message.content = content || message.content;
    await message.save();

    return res.status(200).json({
      message: 'הפנייה עודכנה בהצלחה',
      data: message
    });
  } catch (error) {
    return res.status(500).json({ message: 'שגיאה בעדכון הפנייה' });
  }
};
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({ message: 'פנייה לא נמצאה' });
    }

    if (message.userId !== req.userId) {
      return res.status(403).json({ message: 'אין לך הרשאה למחוק את הפנייה.' });
    }
    await message.destroy();
    return res.status(200).json({ message: 'הפנייה נמחקה בהצלחה' });
  } catch (error) {
    return res.status(500).json({ message: 'שגיאה במחיקת הפנייה' });
  }
};