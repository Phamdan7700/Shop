// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserType } from "Helper/Types";
import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    res.status(200).json({message: 'Login successfully!'});
}
