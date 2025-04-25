import {type DefaultSession, type DefaultUser, User} from 'next-auth'
import type {ISODateString} from "next-auth/core/types";
import {KatalogUser} from "#shared/user/KatalogUser";

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