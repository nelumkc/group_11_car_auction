import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
    itemId: { type: String, required: true },
    bidderName: { type: String, required: true },
    bidAmount: { type: Number, required: true },
    contactNumber: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

const Bid = mongoose.model("Bid", bidSchema);

router.route("/getbids")
    .get((req, res) => {
        Bid.find()
            .then((items) => res.json(items))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/getbidsforitem")
    .get((req, res) => {

        const { itemId } = req.query;
        if (!itemId) {
            res.status(400).send('itemId query parameter is required');
        }
        /*
        Bid.find({ itemId: new mongoose.Types.ObjectId(itemId) })
            .then((items) => res.json(items))
            .catch((err) => res.status(400).json("Error: " + err));
            */
            Bid.find({ itemId: itemId })
            .then((items) => res.json(items))
            .catch((err) => res.status(400).json("Error: " + err));   

    });

router.route("/newbid")
    .post((req, res) => {
        const itemId = req.body.itemId;
        const bidderName = req.body.bidderName;
        const bidAmount = req.body.bidAmount;
        const contactNumber = req.body.contactNumber;

        // create a new bid object 
        const newBid = new Bid({
            itemId,
            bidderName,
            bidAmount,
            contactNumber
        });

        // save the new object (newBid)
        newBid
            .save()
            .then(() => res.json("New bid added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/bid/:id")
    .put((req, res) => {
        Bid.findById(req.params.id)
            .then((bid) => {
                bid.itemId = req.body.itemId;
                bid.bidderName = req.body.bidderName;
                bid.bidAmount = req.body.bidAmount;
                bid.contactNumber = req.body.contactNumber;

                bid
                    .save()
                    .then(() => res.json("Bid updated!"))
                    .catch((err) => res.status(400).json("Error: " + err));
            })
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/bid/:id")
    .delete((req, res) => {
        Bid.findByIdAndDelete(req.params.id)
            .then(() => res.json("Bid deleted."))
            .catch((err) => res.status(400).json("Error: " + err));
    });

export default router;