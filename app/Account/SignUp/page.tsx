
import FormWrapper from '@/app/components/AccountForms/FormWrapper';
import OAuthButtons from '@/app/components/AccountForms/OAuthButtons';
import AuthCheck from '@/app/components/AuthCheck';
import SignUpForm from '@/app/components/AccountForms/SignUp/SignUpForm';
import Link from 'next/link';

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
            <div className="flex justify-center items-center mt-4">
                <p className="text-black text-center mr-2">Already Have An Account?</p>
                <Link href="/Account/Login" className="text-link hover:text-linkHover text-center">Login here</Link>
            </div>
        </FormWrapper>
        </AuthCheck>
    </main>
</div>
    );
};

export default SignUpPage;

