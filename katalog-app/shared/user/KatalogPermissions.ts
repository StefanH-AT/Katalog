import {KatalogRole, KatalogRoles} from "#shared/user/KatalogRoles";

export const KatalogPermissions = {
    ViewFeed: "view_feed",
    NewAccountRole: "new_account_role",
} as const;

export type KatalogPermission = (typeof KatalogPermissions)[keyof typeof KatalogPermissions];

export interface KatalogPermissionConfig {
    [KatalogPermissions.NewAccountRole]: KatalogRole;
    [KatalogPermissions.ViewFeed]: KatalogRole;
}

export const DefaultPermissionConfig: KatalogPermissionConfig = {
    [KatalogPermissions.NewAccountRole]: KatalogRoles.Unverified,
    [KatalogPermissions.ViewFeed]: KatalogRoles.Viewer,
}

// TODO: Add ability to define custom permission config
export function getPermissionConfig(permission: keyof KatalogPermissionConfig): KatalogRole {
    const cfg = useRuntimeConfig();
    return cfg.public.perm[permission] as KatalogRole; // TODO: This is unsafe!
}
