export default function Layout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>Your Title</title>
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}