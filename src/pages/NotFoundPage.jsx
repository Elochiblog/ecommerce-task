import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="container-px py-24 text-center">
      <p className="text-sm text-gray-400 mb-4">Home / 404 Error</p>
      <h1 className="text-8xl font-semibold mb-6">404 Not Found</h1>
      <p className="text-gray-500 mb-10">Your visited page is not found. You may go back to the home page.</p>
      <Link to="/" className="bg-brand-red text-white rounded px-8 py-3 inline-block">Back to home page</Link>
    </div>
  );
}
