import { Link } from "react-router-dom";

const FeaturedBooks = () => {
    const books = [
        {
            id: 1,
            title: "The Complete Guide",
            author: "John Smith",
            category: "Technology",
            available: 5,
            icon: "📘",
        },
        {
            id: 2,
            title: "The Silent World",
            author: "Robert Brown",
            category: "Fiction",
            available: 3,
            icon: "📕",
        },
        {
            id: 3,
            title: "Modern Science",
            author: "Michael Lee",
            category: "Science",
            available: 8,
            icon: "📗",
        },
        {
            id: 4,
            title: "World History",
            author: "David Wilson",
            category: "History",
            available: 2,
            icon: "📙",
        },
    ];

    return (
        <section className="py-20 bg-white">

            <div className="max-w-7xl mx-auto px-6">

                {/* Section Heading */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">

                    <div>
                        <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
                            Our Collection
                        </p>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                            Featured Books
                        </h2>

                        <p className="text-gray-500 mt-3 max-w-xl">
                            Explore some of the popular books available in
                            our online library.
                        </p>
                    </div>

                    {/* View All */}
                    <Link
                        to="/books"
                        className="mt-5 md:mt-0 text-blue-600 font-semibold hover:text-blue-800 transition"
                    >
                        View All Books →
                    </Link>

                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
                        >

                            {/* Book Cover */}
                            <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <span className="text-6xl">
                                    {book.icon}
                                </span>
                            </div>

                            {/* Book Information */}
                            <div className="p-5">

                                {/* Category */}
                                <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                    {book.category}
                                </span>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-gray-900 mt-3">
                                    {book.title}
                                </h3>

                                {/* Author */}
                                <p className="text-sm text-gray-500 mt-1">
                                    By {book.author}
                                </p>

                                {/* Bottom */}
                                <div className="flex items-center justify-between mt-5">

                                    <span className="text-sm text-green-600 font-semibold">
                                        {book.available} Available
                                    </span>

                                    <Link
                                        to="/books"
                                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                                    >
                                        View Book
                                    </Link>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
};

export default FeaturedBooks;