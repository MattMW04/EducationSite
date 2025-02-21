import ClientLoginWrapper from "@/app/components/AccountForms/ClientLoginFormWrapper";

export const metadata = {
    title: 'AccessEDUK : Login',
    description: 'Login page for AccessEDUK',
    keywords: 'login, access, eduk, accesseduk. AccessEDUK login',
};

const LoginPage = () => {
    return (
        <ClientLoginWrapper/>
    );
};

export default LoginPage;
