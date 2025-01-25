import {getServerSession} from "#auth";
import {EventHandlerRequest, H3Event} from "h3";
import {Session} from "@auth/core/types";
import {KatalogRole, KatalogRoles} from "#shared/user/KatalogRoles";
import {AnonymousUser} from "~/server/utils/StoredUser";

export async function protectEndpoint(event: H3Event<EventHandlerRequest>, role: KatalogRole = KatalogRoles.Unverified): Promise<Session> {
    const config = useRuntimeConfig();

    // TODO: Figure out how to properly handle these user types
    // @ts-ignore TS2741
    if(config.public.authDisabled) return AnonymousUser;

    const session = await getServerSession(event);
    if(!session) {
        throw createError({
            statusCode: 403,
            statusMessage: "Unauthenticated",
        })
    }

    return session;
}