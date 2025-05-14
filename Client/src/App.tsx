import React from 'react';
import { Providers } from './lib/providers';
import { useQuery } from '@tanstack/react-query';

// Example query function
const fetchTodoList = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  return response.json();
};

function TodoList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;

  return (
    <ul className="space-y-2">
      {data?.slice(0, 5).map((todo: any) => (
        <li key={todo.id} className="p-2 bg-white rounded shadow">
          <span className={todo.completed ? 'line-through' : ''}>
            {todo.title}
          </span>
        </li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <Providers>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Todo List Example</h1>
          <TodoList />
        </div>
      </div>
    </Providers>
  );
}

export default App;
