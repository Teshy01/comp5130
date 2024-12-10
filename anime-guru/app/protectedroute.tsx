"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../app/lib/firebase";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth(app);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in
                setAuthenticated(true);
            } else {
                // User is not logged in, redirect to login
                router.push("/login");
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup the subscription
    }, [router]);

    if (loading) {
        return <p>Loading...</p>; // Display a loading state
    }

    return authenticated ? <>{children}</> : null;
}
