const express = require("express");
const router = express.Router({mergeParams : true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js")
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isreviewAuthor} = require("../middleware.js");
const Reviews = require("../controllers/reviews.js");




router.post("/", validateReview, isLoggedIn,
  wrapAsync(Reviews.createReview)
);
//Delete reviews

router.delete("/:reviewId", isLoggedIn , isreviewAuthor , wrapAsync(Reviews.deleteReview));

module.exports = router;