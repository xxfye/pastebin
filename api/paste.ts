import { NowRequest, NowResponse } from "@vercel/node";
import { Client, query as q, values } from "faunadb";
import Document = values.Document;

export default async (req: NowRequest, res: NowResponse) => {
  // Faunadb
  const client = new Client({ secret: process.env.FAUNADB_SECRET });
  const { author, syntax, content } : { author: string, syntax: string, content: string } = req.body;
  const ret = await client.query<Document>(
    q.Create(
      q.Collection("posts"),
      { data: { author, syntax, content } }
    ))
  const id = from10to58(ret.ref.id);
  res.json({ id });
}

// base10 to base58
function from10to58(id: string) : string {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  const radix = BigInt(chars.length);
  let num = BigInt(id);
  let ret = '';
  do {
    const mod = Number(num % radix);
    num /= radix;
    ret = chars[mod] + ret;
  } while (num)
  return ret;
}