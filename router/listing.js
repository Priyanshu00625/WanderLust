const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js")
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer')
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })


router.route("/")
     .get(wrapAsync(listingController.index))
     .post(
          validateListing,
          isLoggedIn,
          upload.single("listing[image]"),
          wrapAsync(listingController.createListings),
     );
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
     .get(wrapAsync(listingController.showRoute))
     .put(
          isLoggedIn,
          isOwner,
          upload.single("listing[image]"),
          validateListing,
          wrapAsync(listingController.update))
     .delete(
          isLoggedIn,
          isOwner,
          wrapAsync(listingController.delete))

//Edit Route
router.get("/:id/edit",
     isLoggedIn,
     isOwner,
     wrapAsync(listingController.Editlisting));




module.exports = router;