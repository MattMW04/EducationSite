import Link from "next/link";

export const metadata = {
  title: "AccessEDUK: Home",
  description: "Welcome to AccessEDUK, your platform for creating and sharing quizzes.",
  keywords: "AccessEDUK, quizzes, education, accessibility",
};

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
      {/* Main Content */}
      <main className="flex-grow p-8 text-center mt-4">
        <h1 className="text-3xl font-semibold mb-6 text-headerText">Welcome to Access ED-UK</h1>
        <p className="text-lg mb-6 text-bodyText">
          Discover a platform designed to enhance your education experience. 
        </p>
        <h2 className="text-2xl mb-4 font-semibold text-headerText">Create your own Quizzes</h2>
        <p className="text-lg mb-6  text-bodyText">
          Create your own personalised quizzes to test your knowledge and share with others. You can also select from a range of quizzes created by other users.
        </p>

        <h2 className="text-2xl mb-4 font-semibold text-headerText">Background of the Site</h2>
        <p className="text-lg mb-6  text-bodyText">
          This Product was created by <Link className="text-lg text-boyText underline" href="https://www.linkedin.com/in/matt-wilcox-73106a2ab/" target="_blank" rel="noopener noreferrer">Matt Wilcox</Link> as part of his Final Year Dissertation project .
          The aim of the project was to create a platform that would allow users to create and share quizzes with others, while also being Accessible on a range of devices.
        </p>

        <h2 className="text-2xl mb-4 font-semibold text-headerText">Get Started</h2>
        <p className="text-lg mb-6  text-bodyText">
          To get started, simply create an account or login to an existing account. Once logged in, you can create your own quizzes or select from a range of quizzes created by other users.
        </p>

        <h2 className="text-2xl mb-4 font-bold text-headerText">Feedback</h2>
        <p className="text-lg mb-6  text-bodyText">
        <Link
          className="text-lg text-bodyText underline disabled"
          href="/Feedback"
          aria-label="Provide feedback using the Feedback Form"
        >
          Feedback Form
        </Link>
        </p>

      </main>

      
    </div>
  );
};

export default HomePage;


