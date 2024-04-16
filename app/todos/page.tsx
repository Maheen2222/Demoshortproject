'use client'
import React, { useState, useEffect } from 'react';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const TodoComponent: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      const limit = 11;
      const start = (page - 1) * limit;

      try {
        setLoading(true); 
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${limit}`);
        const fetchedTodos: Todo[] = await response.json();

        const totalCountResponse = await fetch('https://jsonplaceholder.typicode.com/todos');
        const totalCount = (await totalCountResponse.json()).length;
        const calculatedTotalPages = Math.ceil(totalCount / limit);

        setTodos(fetchedTodos);
        setTotalPages(calculatedTotalPages);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [page]);

  const handlePrevClick = () => {
    setPage(Math.max(1, page - 1));
  };

  const handleNextClick = () => {
    setPage(Math.min(page + 1, totalPages));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            {loading && page === 1 && ( 
               <div className="flex items-center justify-center py-4 bg-gray-100">
               <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mr-2"></div>
               <p className="text-gray-700">Loading...</p>
             </div>
            )}
            <div className="overflow-x-auto" style={{ display: loading && page === 1 ? 'none' : 'block' }}>
              <table className="min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-purple-800 text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      User ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {todos.map(todo => (
                    <tr key={todo.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{todo.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{todo.userId}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 break-words">{todo.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {todo.completed ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between">
                <button
                  onClick={handlePrevClick}
                  disabled={page <= 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="hidden sm:inline">Page </span>
                  <span className="font-medium mx-2 px-2 py-1 bg-purple-800 text-white rounded-full">{page}</span>
                  <span>of</span>
                  <span className="font-medium mx-2">{totalPages}</span>
                </div>
                <button
                  onClick={handleNextClick}
                  disabled={page >= totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;


