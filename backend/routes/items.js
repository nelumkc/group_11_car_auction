import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    decription: { type: String, required: false },
    metaData: {type: Object, required: false},
    imgUrl: { type: String, required: false },
    startBid: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model("Item", itemSchema);

router.route("/getitems")
    .get((req, res) => {
        Item.find()
            .then((items) => res.json(items))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/getitem/:id")
    .get((req, res) => {
        Item.findById(req.params.id)
            .then((item) => res.json(item))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/newitem")
    .post((req, res) => {
        const name = req.body.name;
        const decription = req.body.decription;
        const imgUrl = req.body.imgUrl;
        const metaData = req.body.metaData;
        const startBid = req.body.startBid;

        // create a new item object 
        const newItem = new Item({
            name,
            decription,
            imgUrl,
            metaData,
            startBid
        });

        // save the new object (newItem)
        newItem
            .save()
            .then(() => res.json("Item added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/item/:id")
    .put((req, res) => {
        Item.findById(req.params.id)
            .then((item) => {
                item.name = req.body.name;
                item.decription = req.body.decription;
                item.imgUrl = req.body.imgUrl;
                item.metaData = req.body.metaData;

                item
                    .save()
                    .then(() => res.json("Item updated!"))
                    .catch((err) => res.status(400).json("Error: " + err));
            })
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/item/:id")
    .delete((req, res) => {
        Item.findByIdAndDelete(req.params.id)
            .then(() => res.json("Item deleted."))
            .catch((err) => res.status(400).json("Error: " + err));
    });

export default router;