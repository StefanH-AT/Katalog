import {type DefaultSession, type DefaultUser, User} from 'next-auth'
import type {KatalogUser} from "~/server/api/auth/[...]";
import type {ISODateString} from "next-auth/core/types";

declare module 'next-auth' {

    interface DefaultSession {
        user?: User;
        expires: ISODateString;
    }

    interface Session extends DefaultSession {
        user: KatalogUser
    }

    interface User extends DefaultUser {
        displayName: string;
        color: string;
        registerStatus: KatalogUserRegisterStatus;
    }
}