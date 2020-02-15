import React, { useState, useMemo, useReducer, useContext } from 'react';
import { User } from '../types/User';

let u: User = {
    email: "ryan@ryan.io",
    signedIn: false
};

type Action = {type: 'LOG_IN', [key: string]: any};
type Dispatch = (action: Action) => void;

function userReducer(user: User, action: Action): User {
    switch(action.type) {
        case 'LOG_IN': {
            let email = action.email;
            let password = action.password;
            if(email === "rzig408@gmail.com" && password === "password") {
                return {email: "rzig408@gmail.com", signedIn: true}
            } else {
                alert("Incorrect username or password.")
                return {email: "rzig408@gmail.com", signedIn: false}
            }
        }
        default: {
            throw new Error(`Unidentified action type ${action.type}`);
        }
    }
}

const UserDispatchContext = React.createContext<Dispatch | undefined>(undefined);
const UserStateContext = React.createContext<User | undefined>(undefined);

function UserProvider({children}: {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(userReducer, u);
    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    )
}

function useUser(): User {
    const context = useContext(UserStateContext);
    if(context === undefined) { throw new Error(`useUser must be used within a UserProvider.`)}
    return context;
}

function useUserDispatch(): Dispatch {
    const context = useContext(UserDispatchContext);
    if(context === undefined) { throw new Error(`useUserDispatch must be used within a UserProvider.`)}
    return context;
}

export {UserProvider, useUser, useUserDispatch};