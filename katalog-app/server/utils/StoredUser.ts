
import {KatalogRole, KatalogRoles} from "#shared/user/KatalogRoles";

// Internal, server-only user data that shouldn't be always exposed to client
export interface StoredUser {
    id: string;
    name: string;
    email: string;
    image: string;
    displayName: string;
    color: string;
    role: KatalogRole;
}

export const AnonymousUser: StoredUser = {
    id: "anonymous",
    name: "anonymous",
    email: "",
    image: "",
    displayName: "Anonymous",
    color: "#ff00ff",
    role: KatalogRoles.Admin,
}