import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';

const FileUpload = ({ onFileSelect }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'text/csv') {
      onFileSelect(file);
    } else {
      alert('Please upload a valid CSV file');
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
    >
      <input {...getInputProps()} />
      <FiUploadCloud className="mx-auto text-4xl text-gray-400 mb-4" />
      <p className="text-gray-600">
        {isDragActive
          ? 'Drop the CSV file here'
          : 'Drag and drop a CSV file here, or click to select'}
      </p>
      <p className="text-sm text-gray-400 mt-2">
        Only CSV files are accepted
      </p>
    </div>
  );
};

export default FileUpload;
