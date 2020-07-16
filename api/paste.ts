import { NowRequest, NowResponse } from "@vercel/node";
import { Client, query as q, values } from "faunadb";
import Document = values.Document;
const hljs = require('highlight.js')

export default async (req: NowRequest, res: NowResponse) => {
  const client = new Client({ secret: process.env.FAUNADB_SECRET });
  const { author, syntax, content } : { author: string, syntax: string, content: string } = req.body;
  const ret = await client.query<Document>(
    q.Create(
      q.Collection("posts"),
      { data: { author, syntax, content } }
    ))
  const id = ret.ref.id;
  res.json({ id });
}