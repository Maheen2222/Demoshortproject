// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">

        {/* Text Section */}
        <div className="text-center lg:text-left lg:max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            Welcome to the Todo App
          </h1>
          <p className="py-6 text-white text-md md:text-lg leading-relaxed">
            Get started by navigating to your todo list and manage your tasks efficiently.
          </p>
          <Link href="/todos?page=1">
            <button className="btn btn-primary text-white bg-purple-600 hover:bg-purple-900 transition duration-300 ease-in-out transform hover:-translate-y-1">
              View Todos
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex justify-center lg:justify-end flex-1">
          <img src="/todoIndex.png" className="w-full max-w-sm md:max-w-md lg:max-w-lg transition duration-500 ease-in-out transform hover:scale-105" alt="Todo App" />
        </div>
        
      </div>
    </div>
  );
}
