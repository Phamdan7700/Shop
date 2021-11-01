// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CartItemType, UserType } from "Helper/Types";
import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
    user: UserType;
    cart: CartItemType[];
};

const data: Data = {
    user: {
        name: "John Doe",
        email: "email@gmail.com",
        password: "123456",
        isAdmin: false,
    },
    cart: [
        
    ]
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json(data);
}
