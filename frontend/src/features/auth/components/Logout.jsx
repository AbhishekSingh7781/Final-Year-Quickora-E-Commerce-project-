import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync, selectLoggedInUser } from '../AuthSlice';
import { Navigate } from 'react-router-dom';

export const Logout = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    useEffect(() => {
        dispatch(logoutAsync());
    }, [dispatch]);

    return (
        <>
            {!user && <Navigate to="/login" replace={true} />}
        </>
    );
};