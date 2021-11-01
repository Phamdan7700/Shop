// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserType } from "Helper/Types";
import type { NextApiRequest, NextApiResponse } from "next";


const user: UserType = {
    name: "John Doe",
    email: "email@gmail.com",
    password: '123456',
    isAdmin: false,
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserType>
) {
    res.status(200).json(user);
}
