export const KatalogRoles = {
    Anonymous: 0,
    Unverified: 10,
    Viewer: 20,
    Uploader: 30,
    Moderator: 40,
    Admin: 50,
} as const;

export type KatalogRole = (typeof KatalogRoles)[keyof typeof KatalogRoles];
