// import { useEffect, useState } from "react";
// import axios from "axios";

// const Fine = () => {
//     const [borrowedBooks, setBorrowedBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [calculatingId, setCalculatingId] = useState(null);
//     const [payingId, setPayingId] = useState(null);

//     const getBorrowedBooks = async () => {
//         try {
//             setLoading(true);
//             setError("");

//             const token = localStorage.getItem("accessToken");

//             const response = await axios.get(
//                 "http://localhost:9000/borrow/my-borrowed-books",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             if (response.data.success) {
//                 setBorrowedBooks(response.data.data);
//             }
//         } catch (error) {
//             console.log("FINE FETCH ERROR:", error);
//             setError(
//                 error.response?.data?.message ||
//                 "Failed to fetch fine information."
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         getBorrowedBooks();
//     }, []);

//     const calculateFine = async (borrowId) => {
//         try {
//             setCalculatingId(borrowId);

//             const token = localStorage.getItem("accessToken");

//             const response = await axios.put(
//                 `http://localhost:9000/fine/fineAmmount/${borrowId}`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             if (response.data.success) {
//                 alert(
//                     `Fine Calculated: ₹${response.data.data.fineAmmount}`
//                 );
//                 await getBorrowedBooks();
//             }
//         } catch (error) {
//             console.log("FINE CALCULATE ERROR:", error);
//             alert(
//                 error.response?.data?.message ||
//                 "Failed to calculate fine."
//             );
//         } finally {
//             setCalculatingId(null);
//         }
//     };

//     const payFine = async (borrowId, fineAmount) => {
//         try {
//             setPayingId(borrowId);

//             alert(`Payment process started for ₹${fineAmount}.`);
//         } catch (error) {
//             console.log("PAY FINE ERROR:", error);

//             alert(
//                 error.response?.data?.message ||
//                 "Failed to start payment."
//             );
//         } finally {
//             setPayingId(null);
//         }
//     };

//     return (
//         <div className="min-h-[100dvh] bg-slate-50 dark:bg-gray-950 px-2 min-[375px]:px-3 sm:px-5 md:px-8 lg:px-10 py-4 min-[375px]:py-5 sm:py-8">
//             <div className="max-w-7xl mx-auto">
//                 <div className="mb-5 min-[375px]:mb-6 sm:mb-8">
//                     <p className="text-blue-600 font-semibold text-[10px] min-[375px]:text-xs sm:text-sm uppercase tracking-wide">
//                         My Library
//                     </p>

//                     <h1 className="text-2xl min-[375px]:text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-1">
//                         My Fines
//                     </h1>

//                     <p className="text-xs min-[375px]:text-sm text-gray-500 dark:text-gray-400 mt-1">
//                         Check your overdue books and outstanding fines.
//                     </p>
//                 </div>

//                 {loading && (
//                     <div className="text-center py-12 sm:py-20">
//                         <div className="w-9 h-9 sm:w-12 sm:h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
//                         <p className="mt-3 text-xs sm:text-sm text-gray-500">
//                             Checking your fines...
//                         </p>
//                     </div>
//                 )}

//                 {!loading && error && (
//                     <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 min-[375px]:p-4 sm:p-5 text-xs sm:text-sm">
//                         {error}
//                     </div>
//                 )}

//                 {!loading && !error && borrowedBooks.length === 0 && (
//                     <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-sm p-7 min-[375px]:p-9 sm:p-12 text-center">
//                         <div className="text-4xl min-[375px]:text-5xl sm:text-6xl">
//                             💰
//                         </div>

//                         <h2 className="text-lg min-[375px]:text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mt-3 sm:mt-5">
//                             No Fine Records
//                         </h2>

//                         <p className="text-xs min-[375px]:text-sm text-gray-500 mt-1 sm:mt-2">
//                             You currently don't have any borrowed books.
//                         </p>
//                     </div>
//                 )}

//                 {!loading && !error && borrowedBooks.length > 0 && (
//                     <div className="grid grid-cols-2 min-[640px]:grid-cols-2 lg:grid-cols-3 gap-2 min-[375px]:gap-3 sm:gap-5 lg:gap-6">
//                         {borrowedBooks.map((borrow) => {
//                             const book = borrow.bookId;

//                             return (
//                                 <div
//                                     key={borrow._id}
//                                     className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
//                                 >
//                                     <div className="h-28 min-[375px]:h-32 sm:h-44 md:h-48 lg:h-52 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
//                                         {book?.image ? (
//                                             <img
//                                                 src={book.image}
//                                                 alt={book.title}
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         ) : (
//                                             <span className="text-4xl min-[375px]:text-5xl sm:text-6xl">
//                                                 📚
//                                             </span>
//                                         )}
//                                     </div>

//                                     <div className="p-2.5 min-[375px]:p-3 sm:p-5">
//                                         {book?.category && (
//                                             <span className="inline-block max-w-full truncate text-[8px] min-[375px]:text-[9px] sm:text-xs font-semibold text-blue-600 bg-blue-50 px-2 min-[375px]:px-2.5 sm:px-3 py-1 rounded-full">
//                                                 {book.category}
//                                             </span>
//                                         )}

//                                         <h2 className="text-xs min-[375px]:text-sm sm:text-xl font-bold text-gray-900 dark:text-white mt-2 sm:mt-3 truncate">
//                                             {book?.title || "Unknown Book"}
//                                         </h2>

//                                         <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-500 mt-0.5 truncate">
//                                             By {book?.author || "Unknown Author"}
//                                         </p>

//                                         <div className="mt-3 min-[375px]:mt-4 sm:mt-5 space-y-1.5 sm:space-y-2">
//                                             <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-600 dark:text-gray-300">
//                                                 Borrowed:
//                                                 <span className="font-semibold ml-1">
//                                                     {new Date(
//                                                         borrow.borrowDate
//                                                     ).toLocaleDateString()}
//                                                 </span>
//                                             </p>

//                                             <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-600 dark:text-gray-300">
//                                                 Due:
//                                                 <span className="font-semibold ml-1">
//                                                     {new Date(
//                                                         borrow.dueDate
//                                                     ).toLocaleDateString()}
//                                                 </span>
//                                             </p>

//                                             <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm">
//                                                 Status:
//                                                 <span
//                                                     className={`ml-1 font-semibold capitalize ${borrow.status ===
//                                                         "overdue"
//                                                         ? "text-red-600"
//                                                         : borrow.status ===
//                                                             "returned"
//                                                             ? "text-gray-500"
//                                                             : "text-green-600"
//                                                         }`}
//                                                 >
//                                                     {borrow.status}
//                                                 </span>
//                                             </p>

//                                             <div className="mt-3 sm:mt-4 p-2.5 min-[375px]:p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 rounded-lg sm:rounded-xl">
//                                                 <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-500 dark:text-gray-400">
//                                                     Fine Amount
//                                                 </p>

//                                                 <p className="text-lg min-[375px]:text-xl sm:text-2xl font-bold text-red-600 mt-0.5">
//                                                     ₹{borrow.fineAmmount || 0}
//                                                 </p>
//                                             </div>
//                                         </div>

//                                         {borrow.status !== "returned" &&
//                                             Number(
//                                                 borrow.fineAmmount || 0
//                                             ) === 0 && (
//                                                 <button
//                                                     onClick={() =>
//                                                         calculateFine(
//                                                             borrow._id
//                                                         )
//                                                     }
//                                                     disabled={
//                                                         calculatingId ===
//                                                         borrow._id
//                                                     }
//                                                     className="w-full mt-3 sm:mt-5 py-2 min-[375px]:py-2.5 sm:py-3 bg-red-500 text-white text-[9px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-red-600 disabled:opacity-50 transition cursor-pointer"
//                                                 >
//                                                     {calculatingId ===
//                                                         borrow._id
//                                                         ? "Calculating..."
//                                                         : "Calculate Fine"}
//                                                 </button>
//                                             )}

//                                         {Number(borrow.fineAmmount || 0) >
//                                             0 &&
//                                             !borrow.finePaid && (
//                                                 <>
//                                                     <div className="w-full mt-3 sm:mt-5 py-2 min-[375px]:py-2.5 text-center bg-red-50 text-red-600 text-[9px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl">
//                                                         ⚠️ Outstanding Fine
//                                                     </div>

//                                                     <button
//                                                         onClick={() =>
//                                                             payFine(
//                                                                 borrow._id,
//                                                                 borrow.fineAmmount
//                                                             )
//                                                         }
//                                                         disabled={
//                                                             payingId ===
//                                                             borrow._id
//                                                         }
//                                                         className="w-full mt-2 sm:mt-3 py-2 min-[375px]:py-2.5 sm:py-3 bg-green-600 text-white text-[9px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-green-700 disabled:opacity-50 transition cursor-pointer"
//                                                     >
//                                                         {payingId ===
//                                                             borrow._id
//                                                             ? "Processing..."
//                                                             : `Pay ₹${borrow.fineAmmount}`}
//                                                     </button>
//                                                 </>
//                                             )}

//                                         {borrow.finePaid && (
//                                             <div className="w-full mt-3 sm:mt-5 py-2 min-[375px]:py-2.5 text-center bg-green-50 text-green-600 text-[9px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl">
//                                                 ✓ Fine Paid
//                                             </div>
//                                         )}

//                                         {borrow.status === "returned" && (
//                                             <div className="w-full mt-3 sm:mt-5 py-2 min-[375px]:py-2.5 text-center bg-green-50 text-green-600 text-[9px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl">
//                                                 ✓ Book Returned
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Fine;

import { useEffect, useState } from "react";
import API from "../api/axiosInstance";

const Fine = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [calculatingId, setCalculatingId] = useState(null);
    const [payingId, setPayingId] = useState(null);

    const getBorrowedBooks = async (autoCalculate = true) => {
        try {
            setLoading(true);
            setError("");

            const response = await API.get("/borrow/my-borrowed-books");

            if (response.data.success) {
                let booksData = response.data.data;

                if (autoCalculate) {
                    const overdueBooks = booksData.filter((borrow) => {
                        if (borrow.status === "returned") {
                            return false;
                        }

                        if (!borrow.dueDate) {
                            return false;
                        }

                        const dueDate = new Date(borrow.dueDate);
                        const currentDate = new Date();

                        return currentDate > dueDate;
                    });

                    if (overdueBooks.length > 0) {
                        await Promise.all(
                            overdueBooks.map(async (borrow) => {
                                try {
                                    await API.put(
                                        `/fine/fineAmmount/${borrow._id}`,
                                        {}
                                    );
                                } catch (error) {
                                    console.log(
                                        "AUTO FINE CALCULATE ERROR:",
                                        error
                                    );
                                }
                            })
                        );

                        const updatedResponse = await API.get("/borrow/my-borrowed-books");

                        if (updatedResponse.data.success) {
                            booksData = updatedResponse.data.data;
                        }
                    }
                }

                setBorrowedBooks(booksData);
            }
        } catch (error) {
            console.log("FINE FETCH ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Failed to fetch fine information."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBorrowedBooks();
    }, []);

    const calculateFine = async (borrowId) => {
        try {
            setCalculatingId(borrowId);

            const response = await API.put(
                `/fine/fineAmmount/${borrowId}`,
                {}
            );

            if (response.data.success) {
                alert(
                    `Fine Calculated: ₹${response.data.data.fineAmmount}`
                );

                await getBorrowedBooks(false);
            }
        } catch (error) {
            console.log("FINE CALCULATE ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Failed to calculate fine."
            );
        } finally {
            setCalculatingId(null);
        }
    };

    const payFine = async (borrowId, fineAmount) => {
        try {
            setPayingId(borrowId);

            alert(`Payment process started for ₹${fineAmount}.`);
        } catch (error) {
            console.log("PAY FINE ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Failed to start payment."
            );
        } finally {
            setPayingId(null);
        }
    };

    return (
        <div className="min-h-[100dvh] bg-slate-50 dark:bg-gray-950 px-2 min-[375px]:px-3 sm:px-5 md:px-8 lg:px-10 py-4 min-[375px]:py-5 sm:py-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-5 min-[375px]:mb-6 sm:mb-8">
                    <p className="text-blue-600 font-semibold text-[10px] min-[375px]:text-xs sm:text-sm uppercase tracking-wide">
                        My Library
                    </p>

                    <h1 className="text-2xl min-[375px]:text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-1">
                        My Fines
                    </h1>

                    <p className="text-xs min-[375px]:text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Check your overdue books and outstanding fines.
                    </p>
                </div>

                {loading && (
                    <div className="text-center py-12 sm:py-20">
                        <div className="w-9 h-9 sm:w-12 sm:h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
                        <p className="mt-3 text-xs sm:text-sm text-gray-500">
                            Checking your fines...
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 min-[375px]:p-4 sm:p-5 text-xs sm:text-sm">
                        {error}
                    </div>
                )}

                {!loading && !error && borrowedBooks.length === 0 && (
                    <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-sm p-7 min-[375px]:p-9 sm:p-12 text-center">
                        <div className="text-4xl min-[375px]:text-5xl sm:text-6xl">
                            💰
                        </div>

                        <h2 className="text-lg min-[375px]:text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mt-3 sm:mt-5">
                            No Fine Records
                        </h2>

                        <p className="text-xs min-[375px]:text-sm text-gray-500 mt-1 sm:mt-2">
                            You currently don't have any borrowed books.
                        </p>
                    </div>
                )}

                {!loading && !error && borrowedBooks.length > 0 && (
                    <div className="grid grid-cols-2 min-[640px]:grid-cols-2 lg:grid-cols-3 gap-2 min-[375px]:gap-3 sm:gap-5 lg:gap-6">
                        {borrowedBooks.map((borrow) => {
                            const book = borrow.bookId;

                            return (
                                <div
                                    key={borrow._id}
                                    className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
                                >
                                    <div className="h-28 min-[375px]:h-32 sm:h-44 md:h-48 lg:h-52 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                        {book?.image ? (
                                            <img
                                                src={book.image}
                                                alt={book.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-4xl min-[375px]:text-5xl sm:text-6xl">
                                                📚
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-2.5 min-[375px]:p-3 sm:p-5">
                                        {book?.category && (
                                            <span className="inline-block max-w-full truncate text-[8px] min-[375px]:text-[9px] sm:text-xs font-semibold text-blue-600 bg-blue-50 px-2 min-[375px]:px-2.5 sm:px-3 py-1 rounded-full">
                                                {book.category}
                                            </span>
                                        )}

                                        <h2 className="text-xs min-[375px]:text-sm sm:text-xl font-bold text-gray-900 dark:text-white mt-2 sm:mt-3 truncate">
                                            {book?.title || "Unknown Book"}
                                        </h2>

                                        <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-500 mt-0.5 truncate">
                                            By {book?.author || "Unknown Author"}
                                        </p>

                                        <div className="mt-3 min-[375px]:mt-4 sm:mt-5 space-y-1.5 sm:space-y-2">
                                            <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-600 dark:text-gray-300">
                                                Borrowed:
                                                <span className="font-semibold ml-1">
                                                    {new Date(
                                                        borrow.borrowDate
                                                    ).toLocaleDateString()}
                                                </span>
                                            </p>

                                            <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-600 dark:text-gray-300">
                                                Due:
                                                <span className="font-semibold ml-1">
                                                    {new Date(
                                                        borrow.dueDate
                                                    ).toLocaleDateString()}
                                                </span>
                                            </p>

                                            <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm">
                                                Status:
                                                <span
                                                    className={`ml-1 font-semibold capitalize ${
                                                        borrow.status ===
                                                        "overdue"
                                                            ? "text-red-600"
                                                            : borrow.status ===
                                                              "returned"
                                                            ? "text-gray-500"
                                                            : "text-green-600"
                                                    }`}
                                                >
                                                    {borrow.status}
                                                </span>
                                            </p>

                                            <div className="mt-3 sm:mt-4 p-2.5 min-[375px]:p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 rounded-lg sm:rounded-xl">
                                                <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-500 dark:text-gray-400">
                                                    Fine Amount
                                                </p>

                                                <p className="text-lg min-[375px]:text-xl sm:text-2xl font-bold text-red-600 mt-0.5">
                                                    ₹{borrow.fineAmmount || 0}
                                                </p>
                                            </div>
                                        </div>

                                        {borrow.status !== "returned" &&
                                            Number(
                                                borrow.fineAmmount || 0
                                            ) === 0 &&
                                            new Date() >
                                                new Date(borrow.dueDate) && (
                                                <button
                                                    onClick={() =>
                                                        calculateFine(
                                                            borrow._id
                                                        )
                                                    }
                                                    disabled={
                                                        calculatingId ===
                                                        borrow._id
                                                    }
                                                    className="w-full mt-3 sm:mt-5 py-2 min-[375px]:py-2.5 sm:py-3 bg-red-500 text-white text-[9px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-red-600 disabled:opacity-50 transition cursor-pointer"
                                                >
                                                    {calculatingId ===
                                                    borrow._id
                                                        ? "Calculating..."
                                                        : "Calculate Fine"}
                                                </button>
                                            )}

                                        {Number(borrow.fineAmmount || 0) >
                                            0 &&
                                            !borrow.finePaid && (
                                                <>
                                                    <div className="w-full mt-3 sm:mt-5 py-2 min-[375px]:py-2.5 text-center bg-red-50 text-red-600 text-[9px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl">
                                                        ⚠️ Outstanding Fine
                                                    </div>

                                                    <button
                                                        onClick={() =>
                                                            payFine(
                                                                borrow._id,
                                                                borrow.fineAmmount
                                                            )
                                                        }
                                                        disabled={
                                                            payingId ===
                                                            borrow._id
                                                        }
                                                        className="w-full mt-2 sm:mt-3 py-2 min-[375px]:py-2.5 sm:py-3 bg-green-600 text-white text-[9px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-green-700 disabled:opacity-50 transition cursor-pointer"
                                                    >
                                                        {payingId ===
                                                        borrow._id
                                                            ? "Processing..."
                                                            : `Pay ₹${borrow.fineAmmount}`}
                                                    </button>
                                                </>
                                            )}

                                        {borrow.finePaid && (
                                            <div className="w-full mt-3 sm:mt-5 py-2 min-[375px]:py-2.5 text-center bg-green-50 text-green-600 text-[9px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl">
                                                ✓ Fine Paid
                                            </div>
                                        )}

                                        {borrow.status === "returned" && (
                                            <div className="w-full mt-3 sm:mt-5 py-2 min-[375px]:py-2.5 text-center bg-green-50 text-green-600 text-[9px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl">
                                                ✓ Book Returned
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Fine;