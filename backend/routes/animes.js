const router = require('express').Router();
let Anime = require('../models/anime.model');

router.route('/').get((req, res) => {
    Anime.find()
        .then(animes => res.json(animes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const rating = Number(req.body.rating);
    const date = Date.parse(req.body.date);

    const newAnime = new Anime({
        username,
        name,
        rating,
        date,
    });

    newAnime.save()
        .then(() => res.json('Anime added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Anime.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
 });

 router.route('/:id').delete((req, res) => {
     Anime.findByIdAndDelete(req.params.id)
        .then(() => res.json('Anime deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
 });

 router.route('/update/:id').post((req, res) => {
     Anime.findById(req.params.id)
        .then(anime => {
            anime.username = req.body.username;
            anime.name = req.body.name;
            anime.rating = Number(req.body.rating);
            anime.date = Date.parse(req.body.date);

            anime.save()
                .then(() => res.json('Anime updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
 })

module.exports = router;