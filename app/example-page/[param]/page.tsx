async function Page({ params }) {
    const { param } = await params;

    return (
        <div className="flex flex-col min-h-screen">
            <h1 className="text-4xl font-bold text-headerText m-4">Page Navigation with dynamic params</h1>
            <p className="text-bodyText m-4">Accessed page with param : {param}</p>
        </div>
    );
}

export default Page;
