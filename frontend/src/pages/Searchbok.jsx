import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    useSearchParams,
    useNavigate
} from "react-router-dom";

const SearchBooks = () => {

    const [searchParams, setSearchParams] =
        useSearchParams();

    const navigate = useNavigate();

    // ============================
    // SEARCH
    // ============================

    const search =
        searchParams.get("search") || "";

    // ============================
    // STATES
    // ============================

    const [books, setBooks] = useState([]);

    const [page, setPage] = useState(
        Number(searchParams.get("page")) || 1
    );

    const [totalPages, setTotalPages] =
        useState(1);

    const [totalBooks, setTotalBooks] =
        useState(0);

    const [sort, setSort] =
        useState("createdAt");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const limit = 10;

    // ============================
    // FETCH BOOKS
    // ============================

    const fetchBooks = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await axios.get(
                    "http://localhost:9000/book/manage",
                    {
                        params: {
                            search: search,
                            page: page,
                            limit: limit,
                            sort: sort
                        }
                    }
                );

            console.log(
                "Search API Response:",
                response.data
            );

            setBooks(
                response.data.data || []
            );

            setTotalPages(
                response.data.totalPages || 1
            );

            setTotalBooks(
                response.data.totalBooks || 0
            );

        } catch (error) {

            console.log(
                "Search Error:",
                error
            );

            console.log(
                "Backend Error:",
                error.response?.data
            );

            setError(
                error.response?.data?.message ||
                "Unable to fetch books."
            );

            setBooks([]);

        } finally {

            setLoading(false);

        }

    };

    // ============================
    // FETCH WHEN CHANGE
    // ============================

    useEffect(() => {

        fetchBooks();

    }, [
        search,
        page,
        sort
    ]);

    // ============================
    // SORT
    // ============================

    const handleSort = (e) => {

        setSort(e.target.value);

        setPage(1);

        setSearchParams({
            search: search,
            page: 1
        });

    };

    // ============================
    // PAGE
    // ============================

    const handlePageChange =
        (newPage) => {

            setPage(newPage);

            setSearchParams({
                search: search,
                page: newPage
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        };

    // ============================
    // VIEW BOOK
    // ============================

    const handleViewBook =
        (bookId) => {

            navigate(
                `/book/${bookId}`
            );

        };

    return (

        <div
            className="
                min-h-screen
                bg-gradient-to-br
                from-slate-50
                via-white
                to-cyan-50

                px-3
                min-[400px]:px-4
                sm:px-6
                md:px-8
                lg:px-10
                xl:px-12

                py-6
                min-[400px]:py-7
                sm:py-8
                md:py-10
                lg:py-12
            "
        >

            <div className="max-w-7xl mx-auto">

                {/* ==================================
                    HEADER
                ================================== */}

                <div
                    className="
                        flex
                        flex-col
                        md:flex-row

                        md:items-center
                        md:justify-between

                        gap-5
                        sm:gap-6

                        mb-7
                        sm:mb-8
                        md:mb-10
                    "
                >

                    {/* Header Text */}

                    <div className="min-w-0">

                        <p
                            className="
                                text-[10px]
                                min-[400px]:text-xs
                                sm:text-sm

                                font-semibold
                                text-cyan-600

                                uppercase
                                tracking-wider
                            "
                        >
                            Online Library
                        </p>

                        <h1
                            className="
                                text-2xl
                                min-[400px]:text-3xl
                                sm:text-4xl

                                font-bold
                                text-gray-800

                                mt-1

                                leading-tight
                            "
                        >
                            Search Books
                        </h1>

                        <p
                            className="
                                text-gray-500

                                text-xs
                                min-[400px]:text-sm
                                sm:text-base

                                mt-2

                                leading-relaxed
                            "
                        >
                            Find books by title, author or category.
                        </p>

                    </div>

                    {/* Matching Books */}

                    <div
                        className="
                            bg-white

                            px-4
                            min-[400px]:px-5
                            sm:px-6

                            py-3
                            sm:py-4

                            rounded-xl

                            shadow-sm
                            border
                            border-gray-100

                            w-full
                            md:w-auto

                            md:min-w-[150px]
                        "
                    >

                        <p
                            className="
                                text-xs
                                sm:text-sm
                                text-gray-500
                            "
                        >
                            Matching Books
                        </p>

                        <p
                            className="
                                text-xl
                                sm:text-2xl

                                font-bold
                                text-cyan-600

                                mt-0.5
                            "
                        >
                            {totalBooks}
                        </p>

                    </div>

                </div>

                {/* ==================================
                    SEARCH INFO + SORT
                ================================== */}

                <div
                    className="
                        bg-white

                        rounded-xl
                        sm:rounded-2xl

                        shadow-sm
                        border
                        border-gray-100

                        p-4
                        min-[400px]:p-5
                        sm:p-6

                        mb-6
                        sm:mb-8
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            md:flex-row

                            md:items-center
                            md:justify-between

                            gap-4
                            sm:gap-5
                        "
                    >

                        {/* Search */}

                        <div className="min-w-0">

                            <p
                                className="
                                    text-xs
                                    sm:text-sm
                                    text-gray-500
                                "
                            >
                                Search results for
                            </p>

                            <h2
                                className="
                                    text-base
                                    min-[400px]:text-lg
                                    sm:text-xl

                                    font-bold
                                    text-gray-800

                                    mt-1

                                    truncate
                                "
                            >
                                🔍{" "}
                                {search
                                    ? `"${search}"`
                                    : "All Books"}
                            </h2>

                        </div>

                        {/* Sort */}

                        <div
                            className="
                                flex
                                flex-col
                                min-[400px]:flex-row

                                min-[400px]:items-center

                                gap-2
                                sm:gap-3

                                w-full
                                md:w-auto
                            "
                        >

                            <label
                                className="
                                    text-xs
                                    sm:text-sm

                                    font-semibold
                                    text-gray-600

                                    whitespace-nowrap
                                "
                            >
                                Sort By
                            </label>

                            <select
                                value={sort}
                                onChange={handleSort}
                                className="
                                    w-full
                                    min-[400px]:w-auto

                                    px-3
                                    sm:px-4

                                    py-2
                                    sm:py-2.5

                                    bg-gray-50

                                    border
                                    border-gray-300

                                    rounded-lg

                                    outline-none

                                    focus:ring-2
                                    focus:ring-cyan-400

                                    text-xs
                                    sm:text-sm

                                    font-medium
                                "
                            >

                                <option value="createdAt">
                                    Newest
                                </option>

                                <option value="-createdAt">
                                    Oldest
                                </option>

                                <option value="title">
                                    Title A-Z
                                </option>

                                <option value="-title">
                                    Title Z-A
                                </option>

                                <option value="author">
                                    Author A-Z
                                </option>

                                <option value="-author">
                                    Author Z-A
                                </option>

                            </select>

                        </div>

                    </div>

                </div>

                {/* ==================================
                    ERROR
                ================================== */}

                {error && (

                    <div
                        className="
                            bg-red-50
                            border
                            border-red-200

                            text-red-600

                            p-3
                            sm:p-4

                            rounded-xl

                            mb-5
                            sm:mb-6

                            text-center

                            text-xs
                            sm:text-sm
                        "
                    >
                        {error}
                    </div>

                )}

                {/* ==================================
                    LOADING
                ================================== */}

                {loading && (

                    <div
                        className="
                            flex
                            flex-col
                            items-center

                            py-14
                            sm:py-20
                        "
                    >

                        <div
                            className="
                                w-10
                                h-10
                                sm:w-12
                                sm:h-12

                                border-4
                                border-gray-200
                                border-t-cyan-500

                                rounded-full
                                animate-spin
                            "
                        ></div>

                        <p
                            className="
                                mt-3
                                sm:mt-4

                                text-gray-500

                                text-xs
                                sm:text-sm
                            "
                        >
                            Searching books...
                        </p>

                    </div>

                )}

                {/* ==================================
                    NO BOOKS
                ================================== */}

                {!loading &&
                    !error &&
                    books.length === 0 && (

                        <div
                            className="
                                bg-white

                                rounded-xl
                                sm:rounded-2xl

                                shadow-sm
                                border
                                border-gray-100

                                py-14
                                sm:py-20

                                px-4

                                text-center
                            "
                        >

                            <div
                                className="
                                    text-5xl
                                    sm:text-6xl
                                    mb-4
                                    sm:mb-5
                                "
                            >
                                📚
                            </div>

                            <h2
                                className="
                                    text-xl
                                    sm:text-2xl

                                    font-bold
                                    text-gray-800
                                "
                            >
                                No Books Found
                            </h2>

                            <p
                                className="
                                    text-gray-500

                                    text-xs
                                    sm:text-sm
                                    md:text-base

                                    mt-2
                                "
                            >
                                No books match your search.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/books")
                                }
                                className="
                                    mt-5
                                    sm:mt-6

                                    px-5
                                    sm:px-6

                                    py-2.5
                                    sm:py-3

                                    bg-cyan-500
                                    text-white

                                    rounded-lg

                                    text-xs
                                    sm:text-sm

                                    font-semibold

                                    hover:bg-cyan-600
                                    transition
                                "
                            >
                                Browse All Books
                            </button>

                        </div>

                    )}

                {/* ==================================
                    BOOK GRID
                ================================== */}

                {!loading &&
                    books.length > 0 && (

                        <div
                            className="
                                grid

                                grid-cols-2
                                sm:grid-cols-2
                                md:grid-cols-3
                                lg:grid-cols-3
                                xl:grid-cols-4

                                gap-3
                                min-[400px]:gap-3.5
                                sm:gap-5
                                md:gap-6
                                lg:gap-7
                            "
                        >

                            {books.map((book) => (

                                <div
                                    key={book._id}
                                    className="
                                        group

                                        bg-white

                                        rounded-xl
                                        sm:rounded-2xl

                                        shadow-sm

                                        border
                                        border-gray-100

                                        overflow-hidden

                                        hover:shadow-xl
                                        hover:-translate-y-1

                                        transition-all
                                        duration-300

                                        flex
                                        flex-col
                                    "
                                >

                                    {/* ==================================
                                        BOOK COVER
                                    ================================== */}

                                    <div
                                        className="
                                            h-28
                                            min-[400px]:h-32
                                            sm:h-40
                                            md:h-48
                                            lg:h-52
                                            xl:h-56

                                            bg-gradient-to-br
                                            from-cyan-100
                                            via-blue-50
                                            to-indigo-100

                                            flex
                                            items-center
                                            justify-center
                                        "
                                    >

                                        <div
                                            className="
                                                w-16
                                                min-[400px]:w-20
                                                sm:w-24
                                                md:w-28

                                                h-20
                                                min-[400px]:h-24
                                                sm:h-28
                                                md:h-32

                                                bg-white

                                                rounded-md
                                                sm:rounded-lg

                                                shadow-md
                                                sm:shadow-lg

                                                flex
                                                items-center
                                                justify-center
                                            "
                                        >

                                            <span
                                                className="
                                                    text-3xl
                                                    min-[400px]:text-4xl
                                                    sm:text-5xl
                                                    md:text-6xl
                                                "
                                            >
                                                📖
                                            </span>

                                        </div>

                                    </div>

                                    {/* ==================================
                                        DETAILS
                                    ================================== */}

                                    <div
                                        className="
                                            p-2.5
                                            min-[400px]:p-3
                                            sm:p-4
                                            md:p-5
                                            lg:p-6

                                            flex
                                            flex-col
                                            flex-1
                                        "
                                    >

                                        {/* Category */}

                                        {book.category && (

                                            <span
                                                className="
                                                    self-start

                                                    inline-block

                                                    px-1.5
                                                    min-[400px]:px-2
                                                    sm:px-2.5
                                                    md:px-3

                                                    py-0.5
                                                    sm:py-1

                                                    text-[8px]
                                                    min-[400px]:text-[9px]
                                                    sm:text-[10px]
                                                    md:text-xs

                                                    font-semibold

                                                    bg-cyan-50
                                                    text-cyan-600

                                                    rounded-full

                                                    max-w-full
                                                    truncate
                                                "
                                            >
                                                {book.category}
                                            </span>

                                        )}

                                        {/* Title */}

                                        <h2
                                            className="
                                                text-xs
                                                min-[400px]:text-sm
                                                sm:text-base
                                                md:text-lg
                                                lg:text-xl

                                                font-bold
                                                text-gray-800

                                                group-hover:text-cyan-600

                                                transition

                                                mt-1.5
                                                sm:mt-2
                                                md:mt-3

                                                leading-snug

                                                line-clamp-2
                                            "
                                        >
                                            {book.title}
                                        </h2>

                                        {/* Author */}

                                        <p
                                            className="
                                                text-[9px]
                                                min-[400px]:text-[10px]
                                                sm:text-xs
                                                md:text-sm

                                                text-gray-500

                                                mt-1
                                                sm:mt-2

                                                line-clamp-1
                                            "
                                        >

                                            <span className="font-semibold">
                                                Author:
                                            </span>{" "}

                                            {book.author}

                                        </p>

                                        {/* ==================================
                                            BOTTOM
                                        ================================== */}

                                        <div
                                            className="
                                                flex

                                                flex-col
                                                sm:flex-row

                                                sm:items-center
                                                sm:justify-between

                                                gap-2

                                                mt-auto

                                                pt-3
                                                sm:pt-4
                                                md:pt-5

                                                border-t
                                                border-gray-100

                                                mt-3
                                            "
                                        >

                                            {/* Availability */}

                                            <div>

                                                <p
                                                    className="
                                                        text-[8px]
                                                        min-[400px]:text-[9px]
                                                        sm:text-[10px]
                                                        md:text-xs

                                                        text-gray-400
                                                    "
                                                >
                                                    Availability
                                                </p>

                                                <p
                                                    className={`
                                                        text-[9px]
                                                        min-[400px]:text-[10px]
                                                        sm:text-xs
                                                        md:text-sm

                                                        font-bold

                                                        mt-0.5
                                                        sm:mt-1

                                                        ${book.availableCopies > 0
                                                            ? "text-green-600"
                                                            : "text-red-500"
                                                        }
                                                    `}
                                                >
                                                    {book.availableCopies > 0
                                                        ? `${book.availableCopies} Available`
                                                        : "Unavailable"}
                                                </p>

                                            </div>

                                            {/* View Details */}

                                            <button
                                                onClick={() =>
                                                    handleViewBook(
                                                        book._id
                                                    )
                                                }
                                                className="
                                                    w-full
                                                    sm:w-auto

                                                    px-2
                                                    min-[400px]:px-2.5
                                                    sm:px-3
                                                    md:px-4

                                                    py-1.5
                                                    sm:py-2

                                                    bg-cyan-500
                                                    text-white

                                                    rounded-md
                                                    sm:rounded-lg

                                                    text-[9px]
                                                    min-[400px]:text-[10px]
                                                    sm:text-xs
                                                    md:text-sm

                                                    font-semibold

                                                    hover:bg-cyan-600

                                                    transition
                                                "
                                            >
                                                View Details
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                {/* ==================================
                    PAGINATION
                ================================== */}

                {!loading &&
                    books.length > 0 &&
                    totalPages > 1 && (

                        <div
                            className="
                                flex
                                flex-wrap

                                items-center
                                justify-center

                                gap-1.5
                                sm:gap-2

                                mt-8
                                sm:mt-10
                                md:mt-12

                                max-w-full
                                overflow-hidden
                            "
                        >

                            {/* Previous */}

                            <button
                                disabled={page === 1}
                                onClick={() =>
                                    handlePageChange(
                                        page - 1
                                    )
                                }
                                className="
                                    px-2
                                    min-[400px]:px-3
                                    sm:px-4
                                    md:px-5

                                    py-1.5
                                    sm:py-2
                                    md:py-2.5

                                    bg-white

                                    border
                                    border-gray-300

                                    rounded-lg

                                    font-semibold
                                    text-gray-700

                                    text-[9px]
                                    min-[400px]:text-[10px]
                                    sm:text-xs
                                    md:text-sm

                                    hover:bg-gray-50

                                    disabled:opacity-40
                                    disabled:cursor-not-allowed

                                    transition

                                    whitespace-nowrap
                                "
                            >
                                ← Previous
                            </button>

                            {/* Pages */}

                            {Array.from(
                                {
                                    length: totalPages
                                },
                                (_, index) =>
                                    index + 1
                            ).map(
                                (pageNumber) => (

                                    <button
                                        key={pageNumber}
                                        onClick={() =>
                                            handlePageChange(
                                                pageNumber
                                            )
                                        }
                                        className={`
                                            w-7
                                            min-[400px]:w-8
                                            sm:w-9
                                            md:w-10

                                            h-7
                                            min-[400px]:h-8
                                            sm:h-9
                                            md:h-10

                                            rounded-md
                                            sm:rounded-lg

                                            font-semibold

                                            text-[9px]
                                            min-[400px]:text-[10px]
                                            sm:text-xs
                                            md:text-sm

                                            transition

                                            ${page === pageNumber
                                                ? "bg-cyan-500 text-white shadow-md"
                                                : "bg-white border border-gray-300 text-gray-700 hover:bg-cyan-50"
                                            }
                                        `}
                                    >
                                        {pageNumber}
                                    </button>

                                )
                            )}

                            {/* Next */}

                            <button
                                disabled={
                                    page === totalPages
                                }
                                onClick={() =>
                                    handlePageChange(
                                        page + 1
                                    )
                                }
                                className="
                                    px-2
                                    min-[400px]:px-3
                                    sm:px-4
                                    md:px-5

                                    py-1.5
                                    sm:py-2
                                    md:py-2.5

                                    bg-white

                                    border
                                    border-gray-300

                                    rounded-lg

                                    font-semibold
                                    text-gray-700

                                    text-[9px]
                                    min-[400px]:text-[10px]
                                    sm:text-xs
                                    md:text-sm

                                    hover:bg-gray-50

                                    disabled:opacity-40
                                    disabled:cursor-not-allowed

                                    transition

                                    whitespace-nowrap
                                "
                            >
                                Next →
                            </button>

                        </div>

                    )}

            </div>

        </div>
    );
};

export default SearchBooks