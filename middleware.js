import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages:{
        signIn: "/Account/Login",
    }
});
export const config = { matcher: ["/example-page"] };

