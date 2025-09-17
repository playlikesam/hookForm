import QuestionForm from './components/QuestionForm';

function App() {
  return (
    <div className="min-h-screen w-full bg-brandYellow flex flex-col items-center">
      {/* Centered Header */}
      <header className="w-full bg-white border-b shadow-sm mb-0">
        <div className="flex flex-col items-center py-6">
          <h1 className="text-2xl font-extrabold text-gray-900 font-sans tracking-tight mb-1 text-center">V98B Questions</h1>
          <p className="text-gray-600 text-base text-center">Submit your questions anonymously</p>
        </div>
      </header>
      {/* Main content: vertical stacking */}
      <main className="flex-1 w-full flex flex-col items-center pt-8 pb-16">
        <QuestionForm />
      </main>
    </div>
  );
}
export default App;
