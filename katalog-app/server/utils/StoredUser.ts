
import {KatalogRole} from "#shared/user/KatalogRoles";

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
