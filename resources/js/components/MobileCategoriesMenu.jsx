import { Link, usePage } from "@inertiajs/react";

export default function  MobileCategoriesMenu({ onClose }) {
    const {categories} = usePage().props;

    return (
        <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                Catégories
            </p>
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="block px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors font-medium"
                    onClick={onClose}
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
}