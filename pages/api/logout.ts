import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next/types";
import { sessionOptions } from "../../lib/session";
import { User } from "./user";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
    req.session.destroy()
    res.json({ isLoggedIn: false, login: '', avatarUrl: '' });
};
