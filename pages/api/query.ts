// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("api 호출");
  const response = await axios.post(
    "https://ly57pbcacc.execute-api.us-west-2.amazonaws.com/v1/query",
    req.body
  );
  console.log("api 응답", response);

  res.status(200).json(response.data);
}
