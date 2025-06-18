import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="text-center animate-fade-in">
        <h1 className="text-[8rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 drop-shadow-lg animate-bounce">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
