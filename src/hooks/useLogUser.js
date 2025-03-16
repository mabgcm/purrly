import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const useLogUser = () => {
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            console.log('Logged in user:', user);
        } else {
            console.log('No user logged in');
        }
    }, [user]);
};

export default useLogUser;
