// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId, WithId } from "mongodb";
import { collections } from "../services/database.service";
import Prelims from "../models/prelims";

// Global Config
export const prelimsRouter = express.Router();

prelimsRouter.use(express.json());

// GET
prelimsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };

        const prelim = (await collections.Preliminaries.findOne(query)) as unknown as Prelims;
        if (prelim) {
            res.status(200).send(prelim);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});


// POST
prelimsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newPrelim = req.body as Prelims;
        const result = await collections.Preliminaries.insertOne(newPrelim);

        result
            ? res.status(201).send(`Successfully created a new prelim with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new prelim.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT

prelimsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedPrelim: Prelims = req.body as Prelims;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.Preliminaries.updateOne(query, { $set: updatedPrelim });

        result
            ? res.status(200).send(`Successfully updated prelim with id ${id}`)
            : res.status(304).send(`Prelim with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
prelimsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.Preliminaries.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed prelim with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove prelim with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Prelim with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});