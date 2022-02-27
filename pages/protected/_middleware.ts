import { withIronSessionApiRoute,  } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from '../api/user';
import { sessionOptions } from "../../lib/session";
import { NextRequest } from "next/server";

// export default withIronSessionApiRoute(middleware, sessionOptions);

export default function middleware(req: NextApiRequest, rq: NextRequest, res: NextApiResponse<User>) {
    const session = req;

    console.log(session, 'SESSSSISON middleware', rq, req);
}

