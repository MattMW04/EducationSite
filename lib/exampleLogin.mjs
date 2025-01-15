// This is a simple example of a login form submission handler to showcase usage of the libs directory. This function is imported into the Login page component and used as the form submission handler. The handleSubmit function logs the email and password to the console. In a real-world application, this function would be replaced with a call to an authentication API.
const handleSubmit = (email, password) => {
    console.log('Email:', email);
    console.log('Password:', password);
};

export default handleSubmit;