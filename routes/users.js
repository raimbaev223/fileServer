const express = require('express');
const {User, Token, UserFile} = require('../models/database')
const auth = require('../utils/auth');
const {appendFileSync, readFileSync} = require('fs');

const router = express.Router();

router.post('/', (req, res) => {
  User.create(req.body)
      .then(user => {
          const id = require('crypto').randomBytes(32).toString('hex');
          appendFileSync('data/tokens.txt', id.toString() + '\n')
          Token.create({
              id: id,
              userId: user.id,
          }).then(token => {
              const result = {
                  user: user,
                  token: token
              }

              res.json(result)
          })

      })
})

router.get('/:userId', function(req, res, next) {
  // User.findOne(
  //     { model: User, where: { id: userId } },
  // )
  //     .then(user => res.json(user))

    User.findAll({
        include: {
            model: UserFile,
            as: 'userId',
            where: {
                userId: req.params.userId,
            }
        }
    }).then(data => res.json(data))
});

module.exports = router;
