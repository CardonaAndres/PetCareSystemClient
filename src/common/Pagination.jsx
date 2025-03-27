import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({ prevPage, nextPage, currentPage, totalPages }) => {
  return (
    <div className="mt-8 flex justify-center items-center">
        <div className="flex space-x-2">
            <button onClick={prevPage} disabled={currentPage === 1}
                className={`p-2 rounded-md flex items-center justify-center ${
                currentPage === 1 
                    ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                    : 'text-black hover:bg-purple-100'
                }`}
            >
                <ChevronLeft size={20} />
            </button>
        
            <div className="flex items-center bg-purple-100 px-3 py-1 rounded-md text-sm font-medium text-purple-800">
                {currentPage} de {totalPages}
            </div>
        
            <button onClick={nextPage} disabled={currentPage === totalPages}
                className={`p-2 rounded-md flex items-center justify-center ${
                currentPage === totalPages 
                    ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                    : 'text-black hover:bg-purple-100'
                }`}
            >
                <ChevronRight size={20} />
            </button>
        </div>
    </div>
  )
}
