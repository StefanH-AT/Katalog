import {getServerSession} from "#auth";
import {EventHandlerRequest, H3Event} from "h3";

export interface ProtectAgainst {

}

export async function protectEndpoint(event: H3Event<EventHandlerRequest>): Promise<void> {
    const session = await getServerSession(event);
    if(!session) {
        throw createError({
            statusCode: 403,
            statusMessage: "Unauthenticated",
        })
    }
}