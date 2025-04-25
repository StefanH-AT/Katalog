import {type KatalogRole, KatalogRoles} from "#shared/user/KatalogRoles";

/**
 * Stored on the server and exposed to the logged-in user session
 */
export interface KatalogUser {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    displayName: string;
    color: string;
    role: KatalogRole;
}

export const AnonymousUser: KatalogUser = {
    id: "anonymous",
    name: "anonymous",
    email: "",
    avatarUrl: "",
    displayName: "Anonymous",
    color: "#ff00ff",
    role: KatalogRoles.Admin,
}

/**
 * Public profile information exposed by api
 */
export interface KatalogUserProfile {
    name: string;
    avatarUrl: string;
    displayName: string;
    color: string;
    id: string;
}