const router = require("express").Router();

const bannercontroller = require("../Controller/BannerController");
const reviewcontroller = require("../Controller/ReviewController");

router.get("/getCurrentBanner", bannercontroller.getsingleBanner);
// router.get("/getAllBanner", bannercontroller.getallBanner);
router.get("/getAllReviews", reviewcontroller.getallReview);

module.exports = router;
