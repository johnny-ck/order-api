import { Request, Response } from "express";
import express from "express";
import { validatePostOrdersInput } from "./helper";
import OrderModel from "./model";
import { Client } from "@googlemaps/google-maps-services-js";

const router = express.Router();

router.post("/orders", async (req: Request, res: Response) => {
  // console.log(`==== post ${req.body}`);
  const { origin, destination } = req.body;
  const validationResult = validatePostOrdersInput(req.body);
  if (validationResult.length > 0) {
    return res.status(400).send({ error: validationResult.toString() });
  }
  const client = new Client({});
  const distanceResult = await client.distancematrix({
    params: {
      key: process.env.GOOGLE_MAPS_API_KEY || "dummykey",
      origins: [{ lat: +origin[0], lng: +origin[1] }],
      destinations: [{ lat: +destination[0], lng: +destination[1] }],
    },
    timeout: 1000, // milliseconds
  });

  const distanceMeter =
    distanceResult?.data?.rows?.[0]?.elements?.[0]?.distance?.value;

  if (isNaN(distanceMeter)) {
    return res.status(400).send({ error: "google api error" });
  }
  console.log(distanceMeter);
  const newOrder = new OrderModel({
    origin,
    destination,
    distance: distanceMeter,
    status: "UNASSIGNED",
  });
  const saveResult = await newOrder.save();
  const result = {
    id: saveResult.id,
    distance: saveResult.distance,
    status: saveResult.status,
  };
  return res.status(201).send(result);
});

router.patch("/orders/:id", async (req: Request, res: Response) => {
  // console.log(`==== patch ${req.params}`);
  const reqId = req?.params?.id;
  if (!(reqId?.length > 0)) {
    return res.status(400).send({ error: "invalid input" });
  }
  let order;
  try {
    order = await OrderModel.findOneAndUpdate(
      { _id: reqId, status: "UNASSIGNED" },
      { status: "TAKEN" },
      { useFindAndModify: false, new: true }
    );
  } catch (e) {
    return res.status(400).send({ error: "db error" });
  }

  if (!order?.id) {
    return res.status(400).send({ error: "no such order or order was taken" });
  }

  return res.status(200).send({ status: "SUCCESS" });
});

router.get("/orders", async (req: Request, res: Response) => {
  // console.log(`==== get ${req.query}`);

  const page = req?.query?.page;
  const limit = req?.query?.limit;
  if (isNaN(Number(page)) || Number(page) < 1) {
    return res.status(400).send({ error: "invalid page" });
  }

  if (isNaN(Number(limit)) || Number(limit) < 1) {
    return res.status(400).send({ error: "invalid limit" });
  }

  const pageResult = await OrderModel.find({}, null, {
    limit: Number(limit),
    skip: Number(limit) * (Number(page) - 1),
  });

  return res
    .status(200)
    .send(
      pageResult.map(({ id, distance, status }) => ({ id, distance, status }))
    );
});

export { router as orderRouter };
