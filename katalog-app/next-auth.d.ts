import {type DefaultSession, type DefaultUser, User} from 'next-auth'
import type {KatalogUser} from "~/server/api/auth/[...]";

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: KatalogUser
    }

    interface User extends DefaultUser {
        displayName: string;
        color: string;
        registerStatus: KatalogUserRegisterStatus;
    }
}