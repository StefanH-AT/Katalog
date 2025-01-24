import {getServerSession} from "#auth";
import {EventHandlerRequest, H3Event} from "h3";
import {Session} from "@auth/core/types";
import {KatalogRole, KatalogRoles} from "#shared/user/KatalogRoles";

export async function protectEndpoint(event: H3Event<EventHandlerRequest>, role: KatalogRole = KatalogRoles.Unverified): Promise<Session> {
    const session = await getServerSession(event);
    if(!session) {
        throw createError({
            statusCode: 403,
            statusMessage: "Unauthenticated",
        })
    }

    console.log("Protect", session);

    return session;
}