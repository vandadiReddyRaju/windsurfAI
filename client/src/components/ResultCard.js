import React from 'react';

const ResultCard = ({ result }) => {
  const { status, evaluation, original_data } = result;

  if (status === 'error') {
    return (
      <div className="bg-red-50 p-6 rounded-lg shadow-sm mb-4 border border-red-200">
        <h3 className="text-red-800 font-semibold mb-2">Error Processing Entry</h3>
        <p className="text-red-600">{result.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-4 border border-gray-200">
      
     {/*
      <div className="mb-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">
          {original_data['Question Details']}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-1">Student Question</h4>
            <p className="text-gray-600 text-sm">{original_data['Student Question']}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-1">Student Code</h4>
            <pre className="bg-gray-50 p-2 rounded text-sm overflow-x-auto">
              {original_data['Student Code']}
            </pre>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="font-medium text-gray-700 mb-2">Bot Response</h4>
        <p className="text-gray-600 text-sm">{original_data['Bot Response']}</p>
      </div>
      */}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="font-medium text-gray-700 mb-2">AI Evaluation</h4>
        <div className="bg-blue-50 p-4 rounded">
          <p className="text-gray-700 text-sm whitespace-pre-line">{evaluation}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
