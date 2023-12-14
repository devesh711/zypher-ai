/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
    content: [
        "./pages/_app.jsx",
        "./pages/index.jsx",
        "./pages/login.jsx",
        "./pages/profile.jsx",
        "./pages/signup.jsx",
        "./components/layout.jsx"
    ],
    theme: {
        extend: {
            fontFamily: {
                primary: "Arial_Rounded_MT_Bold"
            },
            colors: {
                white: "#fbfbfd"
            }
        }
    },
    plugins: []
});
