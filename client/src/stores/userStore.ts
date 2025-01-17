import { atom } from "recoil"
import persistAtom from "./persistAtom";

export enum Roles {
    ADMIN = "Admin",
    TEACHER = "Teacher"
}
export interface UserState {
    isAuthenticated: boolean,
    role: Roles.ADMIN | Roles.TEACHER | null,
    username: string | null
}

export const userState = atom<UserState>({
    key: "userState",
    default: {
        isAuthenticated: false,
        role: null,
        username: null
    },
    effects_UNSTABLE: [persistAtom],
})
