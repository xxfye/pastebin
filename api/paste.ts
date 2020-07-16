import { NowRequest, NowResponse } from "@vercel/node";
import { Client, query as q, values } from "faunadb";
import Document = values.Document;
import axios from 'axios';

export default async (req: NowRequest, res: NowResponse) => {
  // Google reCAPTCHA
  const vaild = await axios.post('https://www.recaptcha.net/recaptcha/api/siteverify', null,
    { params: { secret: process.env.RECAPTCHA_KEY, response: req.body.token, remoteip: req.headers['x-forwarded-for'] } });
  if(!vaild.data.success)
    res.status(500).json(vaild.data);
  if(vaild.data.score < 0.3)
    res.status(403).json(vaild.data);

  // Faunadb
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