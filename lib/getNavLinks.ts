import { Session } from "next-auth";

export function getNavLinks(session: Session | null) {
    return session?.user
        ? [  
            { href: "/Dashboard", label: "Dashboard" },
            { href: "/createQuiz", label: "Create Quiz" },
            { href: "/Quizzes", label: "All Quizzes" },
            { href: "/YourQuizzes", label: "Your Quizzes" },
            { href: "/createCourse", label: "Create Course" },
            { href: "/Courses", label: "All Courses" },
            { href: "/YourCourses", label: "Your Courses" },
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