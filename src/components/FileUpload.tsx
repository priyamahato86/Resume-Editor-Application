import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
          ${isDragActive && !isDragReject 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }
          ${isDragReject ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`
            p-4 rounded-full transition-colors duration-300
            ${isDragActive && !isDragReject ? 'bg-blue-100' : 'bg-gray-100'}
            ${isDragReject ? 'bg-red-100' : ''}
          `}>
            {isDragReject ? (
              <AlertCircle className={`h-8 w-8 text-red-500`} />
            ) : (
              <Upload className={`h-8 w-8 ${isDragActive ? 'text-blue-500' : 'text-gray-500'}`} />
            )}
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isDragActive
                ? isDragReject
                  ? 'File type not supported'
                  : 'Drop your resume here'
                : 'Upload your resume'
              }
            </p>
            <p className="text-sm text-gray-500">
              Drag & drop or click to select • PDF or DOCX • Max 10MB
            </p>
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>PDF</span>
            </div>
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>DOCX</span>
            </div>
          </div>
        </div>
      </div>

      {rejectedFiles && rejectedFiles.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">
            File rejected: {rejectedFiles[0].errors?.[0]?.message || 'Invalid file type or size'}
          </p>
        </div>
      )}
    </div>
  );
};