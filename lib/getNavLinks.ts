import { Session } from "next-auth";

export function getNavLinks(session: Session | null) {
    return session?.user
        ? [  // Links for authenticated users
            { href: "/Dashboard", label: "Dashboard" },
            { href: "/createQuiz", label: "Create Quiz" },
            { href: "/Quizzes", label: "Quizzes" },
            { href: "/YourQuizzes", label: "Your Quizzes" },
            { href: "/Feedback", label: "Feedback" },
            { href: "/api/auth/signout", label: "Logout" }
        ]
        : [  
            { href: "/", label: "Home" },
            { href: "/Account/Login", label: "Login" },
            { href: "/Account/SignUp", label: "Sign Up" },
            { href: "/Feedback", label: "Feedback" }
        ];
}