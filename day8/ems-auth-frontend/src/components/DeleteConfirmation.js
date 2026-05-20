import React from 'react';

export default function DeleteConfirmation({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full">
        {/* Header */}
        <div className="bg-red-600 text-white p-6">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 text-base mb-6">{message}</p>
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <p className="text-sm text-red-800">
              ⚠️ This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 p-6 border-t">
          <button
            onClick={onConfirm}
            className="flex-1 btn-danger bg-red-600 hover:bg-red-700 py-2"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
