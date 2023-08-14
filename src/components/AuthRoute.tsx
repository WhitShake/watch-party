import { ReactNode, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export interface AuthRoutePageProps {
    children: ReactNode;
};

export const AuthRoute: React.FunctionComponent<AuthRoutePageProps> = (props) => {
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        AuthCheck();
    }, [auth])

    const AuthCheck = onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoading(false);
        }   else {
            console.log("unauthorized user")
            navigate('/');
        }

    });

    if (loading) return <p>loading ...</p>;

    return <>{children}</>;
};

// export default AuthRoute;