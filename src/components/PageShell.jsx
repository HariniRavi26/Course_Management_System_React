import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageShell({ children, page="", auth="public" }) {
    useEffect(() => {
        document.body.dataset.page = page;
        document.body.dataset.auth = auth;
        if (window.guardPage) window.guardPage();
        if (window.renderNavbar) window.renderNavbar();
        return () => {
            document.body.removeAttribute("data-page");
            document.body.removeAttribute("data-auth");
        };
    }, [page, auth]);
    return <>
        <Navbar />
        {children}
        <Footer />
    </>;
}
