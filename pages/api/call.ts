// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export type ResponseType = {
  question: string;
  answer: string[];
  key: string;
  dict: Object;
  valid_num: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await axios.post(
    "https://ly57pbcacc.execute-api.us-west-2.amazonaws.com/v1/autochat",
    req.body
  );

  res.status(200).json(response.data);
}
