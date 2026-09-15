import { useState } from "react";
import axios from "axios";
import AddBookModal from "../components/AddBookModal";
import { toast } from "react-hot-toast"

const AddBook = () => {
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [isAddingBook, setIsAddingBook] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        bookNo: "",
        publishYear: "",
        quantity: "",
        description: "",
        image: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const openAddBookModal = () => {
        setError("");
        setSuccess("");
        setShowAddBookModal(true);
    };

    const confirmAddBook = async () => {
        setIsAddingBook(true);

        try {
            setShowAddBookModal(false);
            await handleSubmit();
        } finally {
            setIsAddingBook(false);
        }
    }


    const handleSubmit = async () => {
        try {
            setFormLoading(true);
            setError("");
            setSuccess("");

            const token = localStorage.getItem("accessToken");

            if (!token) {
                setError("Please login as admin first.");
                return;
            }

            const response = await axios.post(
                "http://localhost:9000/book/addbook",
                {
                    title: formData.title,
                    author: formData.author,
                    category: formData.category,
                    bookNo: formData.bookNo,
                    publishYear: Number(formData.publishYear),
                    quantity: Number(formData.quantity),
                    description: formData.description,
                    image: formData.image
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                toast.success("Book Added Successfully !!")

                setFormData({
                    title: "",
                    author: "",
                    category: "",
                    bookNo: "",
                    publishYear: "",
                    quantity: "",
                    description: "",
                    image: ""
                });
            }
        } catch (error) {
            console.log("ADD BOOK ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);

            setError(
                error.response?.data?.message ||
                "Failed to add book."
            );
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <>


            <div className="min-h-[100dvh] bg-gradient-to-br from-slate-50 via-white to-blue-50 px-2 min-[375px]:px-3 sm:px-5 md:px-8 lg:px-10 py-4 min-[375px]:py-5 sm:py-8">

                <div className="max-w-5xl mx-auto">

                    <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-900 rounded-2xl shadow-lg px-4 py-4 min-[375px]:px-5 min-[375px]:py-5 sm:px-7 sm:py-6 mb-4 min-[375px]:mb-5 sm:mb-7 text-white">

                        <div className="flex items-center gap-3">

                            <div className="w-9 h-9 min-[375px]:w-10 min-[375px]:h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-lg min-[375px]:text-xl sm:text-2xl shrink-0">
                                📚
                            </div>

                            <div className="min-w-0">
                                <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs uppercase tracking-widest text-blue-200 font-semibold">
                                    Admin Panel
                                </p>

                                <h1 className="text-lg min-[375px]:text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                                    Add New Book
                                </h1>
                            </div>

                        </div>

                        <p className="hidden min-[375px]:block text-[10px] min-[375px]:text-xs sm:text-sm text-blue-100 mt-2 ml-12 min-[375px]:ml-[52px]">
                            Add a new book to your library collection.
                        </p>

                    </div>

                    {success && (
                        <div className="mb-3 min-[375px]:mb-4 px-3 py-2 min-[375px]:py-2.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-[10px] min-[375px]:text-xs sm:text-sm font-medium">
                            {success}
                        </div>
                    )}

                    {error && (
                        <div className="mb-3 min-[375px]:mb-4 px-3 py-2 min-[375px]:py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[10px] min-[375px]:text-xs sm:text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 min-[375px]:p-4 sm:p-6">

                        <div className="mb-4 min-[375px]:mb-5 sm:mb-6">

                            <div className="flex items-center gap-2">

                                <div className="w-7 h-7 min-[375px]:w-8 min-[375px]:h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
                                    📖
                                </div>

                                <h2 className="text-base min-[375px]:text-lg sm:text-2xl font-bold text-gray-900">
                                    Book Information
                                </h2>

                            </div>

                            <p className="hidden min-[375px]:block text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500 mt-1 ml-10">
                                Enter all the necessary information about the book.
                            </p>

                        </div>

                        <form
                            onSubmit={(e) => { e.preventDefault(); openAddBookModal(); }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-3 min-[375px]:gap-3.5 sm:gap-5"
                        >

                            <div>
                                <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Book Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter book title"
                                    required
                                    className="w-full h-9 min-[375px]:h-10 sm:h-11 px-3 min-[375px]:px-3.5 sm:px-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-[11px] min-[375px]:text-xs sm:text-sm transition"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Author
                                </label>

                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    placeholder="Enter author name"
                                    required
                                    className="w-full h-9 min-[375px]:h-10 sm:h-11 px-3 min-[375px]:px-3.5 sm:px-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-[11px] min-[375px]:text-xs sm:text-sm transition"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Category
                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="e.g. Programming"
                                    required
                                    className="w-full h-9 min-[375px]:h-10 sm:h-11 px-3 min-[375px]:px-3.5 sm:px-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-[11px] min-[375px]:text-xs sm:text-sm transition"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Book Number
                                </label>

                                <input
                                    type="text"
                                    name="bookNo"
                                    value={formData.bookNo}
                                    onChange={handleChange}
                                    placeholder="e.g. BK-101"
                                    required
                                    className="w-full h-9 min-[375px]:h-10 sm:h-11 px-3 min-[375px]:px-3.5 sm:px-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-[11px] min-[375px]:text-xs sm:text-sm transition"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Publish Year
                                </label>

                                <input
                                    type="number"
                                    name="publishYear"
                                    value={formData.publishYear}
                                    onChange={handleChange}
                                    placeholder="e.g. 2024"
                                    required
                                    className="w-full h-9 min-[375px]:h-10 sm:h-11 px-3 min-[375px]:px-3.5 sm:px-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-[11px] min-[375px]:text-xs sm:text-sm transition"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Total Quantity
                                </label>

                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    min="1"
                                    placeholder="Enter quantity"
                                    required
                                    className="w-full h-9 min-[375px]:h-10 sm:h-11 px-3 min-[375px]:px-3.5 sm:px-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-[11px] min-[375px]:text-xs sm:text-sm transition"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Book Image URL
                                </label>

                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="Paste book image URL"
                                    className="w-full h-9 min-[375px]:h-10 sm:h-11 px-3 min-[375px]:px-3.5 sm:px-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-[11px] min-[375px]:text-xs sm:text-sm transition"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Write book description..."
                                    className="w-full px-3 min-[375px]:px-3.5 sm:px-4 py-2.5 min-[375px]:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-[11px] min-[375px]:text-xs sm:text-sm resize-none transition"
                                />
                            </div>

                            <div className="md:col-span-2 pt-1">

                                <button
                                    type="submit"
                                    disabled={formLoading}
                                    className="w-full sm:w-auto h-9 min-[375px]:h-10 sm:h-11 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 transition cursor-pointer"
                                >
                                    {formLoading ? "Adding Book..." : "Add Book"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

            {showAddBookModal && (
                <AddBookModal
                    formData={formData}
                    onCancel={() => {
                        setShowAddBookModal(false);
                    }}
                    onConfirm={confirmAddBook}
                    loading={isAddingBook}
                />
            )}

        </>
    );
};

export default AddBook;