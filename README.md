# Access-EDUK 🎓

Access-EDUK is a web application designed as part of a dissertation project to provide an interactive and user-friendly platform for educational purposes. The application allows users to create, manage, and participate in courses and quizzes.

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?logo=auth0&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

## Features ✨

- **Course Management**: Create and manage courses with ease. 📚
- **Quizzes**: Participate in quizzes to test knowledge and track progress. 📝
- **Responsive Design**: Optimized for both desktop and mobile devices. 📱💻
- **User Authentication**: Secure login and registration system powered by NextAuth.js. 🔒
- **Modern UI**: Built with the latest web technologies for a seamless user experience. 🎨
- **Public and Private Content**: Manage visibility of quizzes and courses. 🔐

## Deployed Version 🌐

The application is live and accessible at: [AccessEDUK](https://access-eduk.vercel.app/)

## Getting Started 🚀

### Prerequisites ✅

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16 or higher) 🟢
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) 📦
- [MongoDB](https://www.mongodb.com/) (local or cloud instance) 🗄️

### Installation 🛠️

1. Clone the repository:
   ```bash
   git clone https://github.com/MattMW04/EducationSite.git
   cd EducationSite
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     NEXTAUTH_SECRET=your_secret
     MONGODB_URI=your_mongodb_connection_string
     NEXT_PUBLIC_API_URL=http://localhost:3000
     ```

### Running the Application ▶️

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`. 🌍

### Building for Production 🏗️

To build the application for production:
```bash
npm run build
# or
yarn build
```

To start the production server:
```bash
npm start
# or
yarn start
```

## Technologies Used 🛠️

- **Frontend**: React, Next.js, DaisyUI 🎨
- **Backend**: Node.js, NextAuth.js 🖥️
- **Database**: MongoDB 🗄️
- **Hosting**: Vercel 🚀
- **Testing**: Cypress 🧪

## License 📜

This project is licensed under the [Apache License 2.0](LICENSE).

## Contact 📧

For any inquiries or feedback, please contact [6Wilcm63@solent.ac.uk]. ✉️
