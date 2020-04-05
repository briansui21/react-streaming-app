import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut } from "../actions";

const GoogleAuth = () => {
    const auth = useRef(null);

    const isSignedIn = useSelector((state) => state.auth.isSignedIn);
    const dispatch = useDispatch();

    const authInit = () => {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId:
                        "923845597643-i984hrorbtsnjqbk1n554vka41rv88i1.apps.googleusercontent.com",
                    scope: "email",
                })
                .then(() => {
                    auth.current = window.gapi.auth2.getAuthInstance();
                    onAuthChange(auth.current.isSignedIn.get());
                    auth.current.isSignedIn.listen(onAuthChange);
                });
        });
    };
    useEffect(authInit, []);

    const onAuthChange = (signedIn) => {
        if (signedIn) {
            dispatch(signIn(auth.current.currentUser.get().getId()));
        } else {
            dispatch(signOut());
        }
    };

    const onSignInClick = () => {
        auth.current.signIn();
    };

    const onSignOutClick = () => {
        auth.current.signOut();
    };

    const renderAuthButton = () => {
        if (isSignedIn === null) {
            return null;
        } else if (isSignedIn) {
            return (
                <button
                    onClick={onSignOutClick}
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button
                    onClick={onSignInClick}
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    };

    return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
