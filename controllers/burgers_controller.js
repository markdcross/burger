const express = require('express');

const router = express.Router();

const burger = require('../models/burgers');

// Create the router for the app
router.get('/', function (req, res) {
    burger.selectAll(function (data) {
        const hbsObject = {
            burgers: data,
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/api/burgers', function (req, res) {
    burger.create(
        ['burger_name', 'devoured'],
        [req.body.burger_name, req.body.devoured],
        function (result) {
            res.json({ id: result.insertId });
        }
    );
});

router.put('/api/burgers/:id', function (req, res) {
    const condition = `id = ${req.params.id}`;

    console.log('condition', condition);

    burger.updateOne(
        {
            devoured: req.body.devoured,
        },
        condition,
        function (results) {
            if (result.changedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    );
});

// Export the router
module.exports = router;
