const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to log out' });
      }
      res.clearCookie('connect.sid');
      return res.json({ success: true, message: 'Logged out successfully' });
    });
  } else {
    res.clearCookie('connect.sid');
    return res.json({ success: true, message: 'Logged out successfully' });
  }
});

module.exports = router;
