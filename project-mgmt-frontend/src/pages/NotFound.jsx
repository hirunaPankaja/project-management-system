import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <div className="text-center max-w-md">
        {/* Simple green circle with 404 */}
        <div className="mx-auto mb-8 w-32 h-32 rounded-full bg-emerald-50 flex items-center justify-center border-2 border-emerald-100">
          <span className="text-4xl font-bold text-emerald-600">404</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Return to Homepage
          </Link>
          
          <p className="text-sm text-gray-500">
            or <Link to="/contact" className="text-emerald-600 hover:underline">contact support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}