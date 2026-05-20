import { FiX } from "react-icons/fi";

function EmployeeModal({ children, closeModal, title }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={closeModal}
            className="hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-all"
            title="Close"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default EmployeeModal;