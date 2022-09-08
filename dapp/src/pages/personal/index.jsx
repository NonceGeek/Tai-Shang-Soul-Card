import React from 'react';

export default function index() {
  return (
    <>
      <div className=" w-screen h-screen bg-black">
        <div className="w-main m-auto">
          {/* 替换成组件 */}
          <header className="h-header bg-red-500">header</header>
          <main className="flex">
            <div className="w-3/5 bg-blue-500 h-screen">
              {/* edit component */}
            </div>
            <div className="w-2/5 bg-yellow-500 h-screen">
              {/* card component*/}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
