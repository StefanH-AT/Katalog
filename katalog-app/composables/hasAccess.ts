import {getPermissionConfig, type KatalogPermission, KatalogPermissions} from "#shared/user/KatalogPermissions";
import {KatalogRoles} from "#shared/user/KatalogRoles";

export function hasAccess(permission: KatalogPermission): boolean {

    const role = getPermissionConfig(KatalogPermissions.ViewFeed);

    if(role === KatalogRoles.Anonymous) return true;

    const auth = useAuth();
    if(auth.status.value === "unauthenticated" || auth.status.value === "loading") return false;

    console.log(auth.data.value);

    return false;
}