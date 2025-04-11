export default function FriendComponent() {
    return (
        <main className="w-full flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-body font-semibold mb-4">Friend List</h1>

            <section className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img
                        src="/assets/imgs/default.jpeg"
                        alt="Friend"
                        className="w-14 h-14 rounded-full shadow-lg" 
                    />
                    <div className="grid grid-cols-1 space-x-3 md:grid-cols-2">
                        <h2 className="text-lg font-semibold">Friend Name</h2>
                        <span className="text-sm text-white bg-orange-300 border border-orange-300 p-1 font-semibold font-display rounded">Friend Status</span>
                    </div>
                </div>
            </section>
        </main>
    );
}
