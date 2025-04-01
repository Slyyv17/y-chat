import { SearchIcon } from "lucide-react";

export default function Search() {
    return (
        <div className="flex items-center border border-[var(--color-accent)] rounded-lg px-3 py-2 w-full max-w-sm font-display">
            <SearchIcon size={16} className="text-[var(--color-accent)]" />
            <input
                className="border-none outline-none w-full px-2 bg-transparent placeholder:text-[var(--color-accent)]"
                type="search"
                placeholder="Search"
            />
        </div>
    );
}
