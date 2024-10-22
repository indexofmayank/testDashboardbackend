const router = require('express').Router();
const SeoController = require('../controllers/SeoController');

router.route('/').get(SeoController.getAllSeo);
router.route('/').post(SeoController.createSeo);
router.route('/seoforpage/').get(SeoController.getSeoByPage);

module.exports = router;