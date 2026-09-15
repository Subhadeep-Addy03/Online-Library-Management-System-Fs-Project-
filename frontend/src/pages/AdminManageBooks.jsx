import { useEffect, useState } from "react";
import axios from "axios";
import UpdateBookModal from "../components/UpdateBookModal";
import DeleteBookModal from "../components/DeleteBookModal";
import { toast } from "react-hot-toast";

const AdminManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editingBook, setEditingBook] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedUpdateBook, setSelectedUpdateBook] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDeleteBook, setSelectedDeleteBook] = useState(null);

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

    const getAllBooks = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                "http://localhost:9000/book/getallbook"
            );

            if (response.data.success) {
                setBooks(response.data.data);
            }
        } catch (error) {
            console.log("GET ALL BOOKS ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Failed to fetch books."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllBooks();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const openUpdateModal = () => {
        if (!editingBook) {
            return;
        }

        setSelectedUpdateBook({
            ...editingBook,
            ...formData
        });

        setShowUpdateModal(true);
    };

    const confirmUpdate = async () => {
        if (!editingBook) {
            return;
        }

        setShowUpdateModal(false);

        await handleUpdate();
    };

    const handleUpdate = async () => {

        try {
            setFormLoading(true);
            setError("");
            setSuccess("");

            const token = localStorage.getItem("accessToken");

            if (!token) {
                setError("Please login as admin first.");
                return;
            }

            const response = await axios.put(
                `http://localhost:9000/book/update/${editingBook._id}`,
                {
                    title: formData.title,
                    author: formData.author,
                    category: formData.category,
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
                toast.success("Book Updated Successfully !!");
                resetForm();
                getAllBooks();
            }
        } catch (error) {
            console.log("UPDATE BOOK ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);

            setError(
                error.response?.data?.message ||
                "Failed to update book."
            );
        } finally {
            setFormLoading(false);
        }
    };

    const handleEdit = (book) => {
        setEditingBook(book);

        setFormData({
            title: book.title || "",
            author: book.author || "",
            category: book.category || "",
            bookNo: book.bookNo || "",
            publishYear: book.publishYear || "",
            quantity: book.quantity || "",
            description: book.description || "",
            image: book.image || ""
        });

        setError("");
        setSuccess("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const openDeleteModal = (book) => {
        setSelectedDeleteBook(book);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!selectedDeleteBook) {
            return;
        }

        setShowDeleteModal(false);

        await handleDelete(selectedDeleteBook._id);

        setSelectedDeleteBook(null);
    };

    const handleDelete = async (bookId) => {
        try {
            setError("");
            setSuccess("");

            const token = localStorage.getItem("accessToken");

            if (!token) {
                setError("Please login as admin first.");
                return;
            }

            const response = await axios.delete(
                `http://localhost:9000/book/delete/${bookId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                toast.success("Book Deleted Successfully!");
                getAllBooks();
            }
        } catch (error) {
            console.log("DELETE BOOK ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);

            setError(
                error.response?.data?.message ||
                "Failed to delete book."
            );
        }
    }

    const resetForm = () => {
        setEditingBook(null);

        setFormData({
            title: "",
            author: "",
            category: "",
            bookNo: "",
            publishYear: "",
            quantity: "",
            description: "",
            image: ""
        })
    }

    return (
        <>
            <div className="min-h-[100dvh] bg-gradient-to-br from-slate-50 via-white to-blue-50 px-2 min-[375px]:px-3 sm:px-5 md:px-8 lg:px-10 py-4 min-[375px]:py-5 sm:py-8">

                <div className="max-w-7xl mx-auto">

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
                                    Manage Books
                                </h1>
                            </div>

                        </div>

                        <p className="hidden min-[375px]:block text-[10px] min-[375px]:text-xs sm:text-sm text-blue-100 mt-2 ml-12 min-[375px]:ml-[52px]">
                            Update and manage all books in your library.
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

                    {editingBook && (
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 min-[375px]:p-4 sm:p-6 mb-4 min-[375px]:mb-5 sm:mb-7">

                            <div className="flex items-center justify-between gap-2 mb-4 min-[375px]:mb-5 sm:mb-6">

                                <div className="flex items-center gap-2 min-w-0">

                                    <div className="w-7 h-7 min-[375px]:w-8 min-[375px]:h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm shrink-0">
                                        ✏️
                                    </div>

                                    <div className="min-w-0">
                                        <h2 className="text-base min-[375px]:text-lg sm:text-2xl font-bold text-gray-900">
                                            Update Book
                                        </h2>

                                        <p className="hidden sm:block text-gray-500 text-sm mt-1">
                                            Update the selected book information.
                                        </p>
                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="shrink-0 px-2.5 min-[375px]:px-3 sm:px-4 h-8 min-[375px]:h-9 sm:h-10 bg-gray-100 text-gray-700 rounded-lg text-[10px] min-[375px]:text-xs sm:text-sm font-semibold hover:bg-gray-200 transition cursor-pointer"
                                >
                                    Cancel
                                </button>

                            </div>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    openUpdateModal();
                                }}
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
                                        disabled
                                        className="w-full h-9 min-[375px]:h-10 sm:h-11 px-3 min-[375px]:px-3.5 sm:px-4 bg-gray-100 border border-gray-200 rounded-lg sm:rounded-xl outline-none text-[11px] min-[375px]:text-xs sm:text-sm text-gray-500"
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

                                <div className="md:col-span-2 flex gap-2 min-[375px]:gap-3 pt-1">

                                    <button
                                        type="submit"
                                        disabled={formLoading}
                                        className="flex-1 sm:flex-none h-9 min-[375px]:h-10 sm:h-11 px-4 sm:px-7 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[10px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 transition cursor-pointer"
                                    >
                                        {formLoading ? "Updating..." : "Update Book"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex-1 sm:flex-none h-9 min-[375px]:h-10 sm:h-11 px-4 sm:px-7 bg-gray-100 text-gray-700 text-[10px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-gray-200 transition cursor-pointer"
                                    >
                                        Clear
                                    </button>

                                </div>

                            </form>

                        </div>
                    )}

                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                        <div className="px-3 py-3 min-[375px]:px-4 min-[375px]:py-4 sm:px-6 sm:py-5 border-b border-gray-100 flex items-center justify-between gap-2">

                            <div className="flex items-center gap-2 min-w-0">

                                <div className="w-7 h-7 min-[375px]:w-8 min-[375px]:h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm shrink-0">
                                    📚
                                </div>

                                <div className="min-w-0">
                                    <h2 className="text-base min-[375px]:text-lg sm:text-2xl font-bold text-gray-900">
                                        All Books
                                    </h2>

                                    <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-500 mt-0.5">
                                        Total Books: {books.length}
                                    </p>
                                </div>

                            </div>

                            <div className="shrink-0 px-2 py-1 min-[375px]:px-2.5 min-[375px]:py-1.5 rounded-full bg-blue-50 text-blue-600 text-[9px] min-[375px]:text-[10px] sm:text-xs font-bold">
                                {books.length}
                            </div>

                        </div>

                        {loading && (
                            <div className="py-12 min-[375px]:py-14 sm:py-20 text-center">

                                <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-12 sm:h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

                                <p className="mt-3 text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500">
                                    Loading books...
                                </p>

                            </div>
                        )}

                        {!loading && books.length === 0 && (
                            <div className="py-12 min-[375px]:py-14 sm:py-20 text-center px-4">

                                <div className="text-4xl min-[375px]:text-5xl sm:text-6xl">
                                    📚
                                </div>

                                <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500 mt-3">
                                    No books available.
                                </p>

                            </div>
                        )}

                        {!loading && books.length > 0 && (
                            <div className="overflow-x-auto">

                                <table className="w-full text-left min-w-[760px]">

                                    <thead className="bg-slate-50">

                                        <tr>

                                            <th className="px-3 min-[375px]:px-4 sm:px-6 py-3 min-[375px]:py-3.5 sm:py-4 text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-600">
                                                Book
                                            </th>

                                            <th className="px-3 min-[375px]:px-4 sm:px-6 py-3 min-[375px]:py-3.5 sm:py-4 text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-600">
                                                Category
                                            </th>

                                            <th className="px-3 min-[375px]:px-4 sm:px-6 py-3 min-[375px]:py-3.5 sm:py-4 text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-600">
                                                Author
                                            </th>

                                            <th className="px-3 min-[375px]:px-4 sm:px-6 py-3 min-[375px]:py-3.5 sm:py-4 text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-600">
                                                Quantity
                                            </th>

                                            <th className="px-3 min-[375px]:px-4 sm:px-6 py-3 min-[375px]:py-3.5 sm:py-4 text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-600">
                                                Available
                                            </th>

                                            <th className="px-3 min-[375px]:px-4 sm:px-6 py-3 min-[375px]:py-3.5 sm:py-4 text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-600">
                                                Actions
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody className="divide-y divide-gray-100">

                                        {books.map((book) => (
                                            <tr
                                                key={book._id}
                                                className="hover:bg-gray-50 transition"
                                            >

                                                <td className="px-3 min-[375px]:px-4 sm:px-6 py-3 min-[375px]:py-4">

                                                    <div className="flex items-center gap-2 min-[375px]:gap-3">

                                                        <div className="w-10 h-12 min-[375px]:w-12 min-[375px]:h-14 sm:w-14 sm:h-16 rounded-lg overflow-hidden bg-blue-100 flex items-center justify-center shrink-0">

                                                            {book.image ? (
                                                                <img
                                                                    src={book.image}
                                                                    alt={book.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <span className="text-lg min-[375px]:text-xl sm:text-2xl">
                                                                    📚
                                                                </span>
                                                            )}

                                                        </div>

                                                        <div className="min-w-0">

                                                            <p className="font-semibold text-gray-900 text-[10px] min-[375px]:text-xs sm:text-sm max-w-[150px] truncate">
                                                                {book.title}
                                                            </p>

                                                            <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-gray-500 mt-0.5">
                                                                {book.bookNo}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>

                                                <td className="px-3 min-[375px]:px-4 sm:px-6 py-3 min-[375px]:py-4">

                                                    <span className="inline-block max-w-[110px] truncate px-2 min-[375px]:px-2.5 py-1 text-[9px] min-[375px]:text-[10px] sm:text-xs font-semibold rounded-full bg-blue-50 text-blue-600">
                                                        {book.category}
                                                    </span>

                                                </td>

                                                <td className="px-3 min-[375px]:px-4 sm:px-6 py-3 min-[375px]:py-4 text-[10px] min-[375px]:text-xs sm:text-sm text-gray-600 max-w-[140px] truncate">
                                                    {book.author}
                                                </td>

                                                <td className="px-3 min-[375px]:px-4 sm:px-6 py-3 min-[375px]:py-4 text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-700">
                                                    {book.quantity}
                                                </td>

                                                <td className="px-3 min-[375px]:px-4 sm:px-6 py-3 min-[375px]:py-4">

                                                    <span
                                                        className={`inline-flex items-center justify-center min-w-7 px-2 py-1 rounded-full text-[9px] min-[375px]:text-[10px] sm:text-xs font-bold ${book.availableCopies > 0
                                                            ? "bg-green-50 text-green-600"
                                                            : "bg-red-50 text-red-500"
                                                            }`}
                                                    >
                                                        {book.availableCopies}
                                                    </span>

                                                </td>

                                                <td className="px-3 min-[375px]:px-4 sm:px-6 py-3 min-[375px]:py-4">

                                                    <div className="flex gap-1.5 min-[375px]:gap-2">

                                                        <button
                                                            onClick={() => handleEdit(book)}
                                                            className="px-2.5 min-[375px]:px-3 py-1.5 min-[375px]:py-2 bg-yellow-50 text-yellow-700 rounded-lg text-[9px] min-[375px]:text-[10px] sm:text-xs font-semibold hover:bg-yellow-100 transition cursor-pointer"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            onClick={() => openDeleteModal(book)}
                                                            className="px-2.5 min-[375px]:px-3 py-1.5 min-[375px]:py-2 bg-red-50 text-red-600 rounded-lg text-[9px] min-[375px]:text-[10px] sm:text-xs font-semibolover:bg-red-100 transition cursor-pointer"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>
                        )}

                    </div>

                </div>

            </div>

            {showUpdateModal && (
                <UpdateBookModal
                    book={selectedUpdateBook}
                    onCancel={() => {
                        setShowUpdateModal(false);
                        setSelectedUpdateBook(null);
                    }}
                    onConfirm={confirmUpdate}
                    loading={formLoading}
                />
            )}

            {showDeleteModal && (
                <DeleteBookModal
                    book={selectedDeleteBook}
                    onCancel={() => {
                        setShowDeleteModal(false);
                        setSelectedDeleteBook(null);
                    }}
                    onConfirm={confirmDelete}
                    loading={false}
                />
            )}
        </>
    );
};

export default AdminManageBooks;