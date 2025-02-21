


import FormWrapper from '@/app/components/AccountForms/FormWrapper';
import OAuthButtons from '@/app/components/AccountForms/OAuthButtons';
import AuthCheck from '@/app/components/AuthCheck';
import SignUpForm from '@/app/components/AccountForms/SignUp/SignUpForm';

export const metadata={
    title:"Sign Up",
    description:"Sign up for an account on AccessEDUK to access all the features of the site"
};

const SignUpPage = () => {


    return (
        <div className="bg-background min-h-screen flex items-start justify-center pt-24 p-4">
        <main className="flex justify-center items-start w-full ">
        <AuthCheck >
        <FormWrapper title="Sign Up">
            <SignUpForm/>
            <OAuthButtons />
            <p className="text-sm text-center text-bodyText mt-4">
                Already have an account? <a href="/login" className="text-link hover:text-linkHover">Login here</a>
            </p>
        </FormWrapper>
        </AuthCheck>
    </main>
</div>
    );
};

export default SignUpPage;

