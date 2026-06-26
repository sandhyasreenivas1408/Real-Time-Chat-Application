const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
        <p className="text-2xl text-gray-800 mb-8">Page Not Found</p>
        <a href="/chat" className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          Go Back to Chat
        </a>
      </div>
    </div>
  );
};

export default NotFound;