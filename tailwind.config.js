/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
    content: [
        "./pages/_app.jsx",
        "./pages/index.jsx",
        "./pages/login.jsx",
        "./pages/profile.jsx",
        "./pages/signup.jsx",
        "./components/layout.jsx",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                primary: "Arial_Rounded_MT_Bold",
                Inter: "Inter"
            },
            colors: {
                white: "#fbfbfd"
            }
        }
    },

    darkMode: "class",
    plugins: [nextui()]
});
