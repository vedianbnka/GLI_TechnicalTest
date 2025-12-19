const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-xl">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          
          {/* Loading Text */}
          <p className="text-gray-700 font-semibold text-lg">Loading... </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;