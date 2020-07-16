import { NowResponse, NowRequest } from "@vercel/node";
import { Client, query as q, values } from "faunadb";
import Document = values.Document;
const hljs = require('highlight.js')

export default async (req: NowRequest, res: NowResponse) => {
  const client = new Client({ secret: process.env.FAUNADB_SECRET })
  const id: string = req.query.id || req.body.id;
  const ret = await client.query<Document>(
    q.Get(
      q.Ref(q.Collection('posts'), id)
    )
  )
  const { content, syntax, author }  = ret.data as { content: string, syntax: string, author: string };
  const { value: highlight, language } = hljs.highlightAuto(content, syntax ? [syntax] : null);
  res.json({ content, syntax: language, author, highlight });
}