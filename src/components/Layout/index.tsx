import React from "react";
import './layout.css';

interface ILayoutProps {
    children: React.ReactNode;
}

function Layout({children}: ILayoutProps) {
    return (
        <section>
            {children}
        </section>
    );
}

export default Layout;
