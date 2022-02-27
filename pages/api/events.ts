import { Endpoints } from "@octokit/types"
import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next/types"
import { Octokit } from "octokit"
import { sessionOptions } from "../../lib/session"
import { User } from "./user"

export type Events =
Endpoints['GET /users/{username}/events']['response']['data']

const octokit = new Octokit()

export default withIronSessionApiRoute(eventsRoute, sessionOptions);

async function eventsRoute(req: NextApiRequest, res: NextApiResponse<Events>) {
    const user = req.session.user as User;

    if (!user || user.isLoggedIn === false) {
        res.status(401).end();
        return
    }

    try {
        const { data } = await octokit.rest.activity.listPublicEventsForUser({
            username: user.login
        })
    } catch (error) {
        res.status(500).json([]);
    }
}
