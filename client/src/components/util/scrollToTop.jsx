import { useEffect } from "react";
import { useLocation } from "react-router";

export const scrollBehavior = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
};

export default function ScrollToTop () {
    const { pathname } = useLocation();

    useEffect(() => {
        scrollBehavior();
    }, [pathname]);

    return null;
}
