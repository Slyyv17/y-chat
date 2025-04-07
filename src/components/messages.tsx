import SearchBar from "@/components/ui/search";

export default function Messages() {
    return (
        <main className="w-full h-screen flex flex-col gap-4 p-6">
            <h1 className="font-body font-semibold text-2xl capitalize text-[var(--color-bg)]">
                Recent Chat
            </h1>
            <SearchBar />
            <p className="font-display font-medium text-[var(--color-bg)]"> Sort by: </p>

            <section>
                
            </section>
        </main>
    );
}
