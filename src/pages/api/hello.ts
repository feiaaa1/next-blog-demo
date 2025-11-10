// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  data?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ 
    message: "Hello from API Routes!",
    data: {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.url
    }
  });
}
