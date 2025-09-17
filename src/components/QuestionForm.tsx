import { useState, useEffect } from 'react';

interface QuestionData {
  id: string;
  question: string;
  email: string;
  donation: string;
  timestamp: number;
}

const STORAGE_KEY = 'v98b_recent_questions';

export default function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [donation, setDonation] = useState('');
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  useEffect(() => {
    // Load saved questions on component mount
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setQuestions(JSON.parse(saved));
    }
  }, []);

  const saveQuestions = (questions: QuestionData[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newQuestion: QuestionData = {
      id: crypto.randomUUID(),
      question,
      email,
      donation,
      timestamp: Date.now(),
    };

    const updatedQuestions = [newQuestion, ...questions].slice(0, 10); // Keep max 10 recent questions

    setQuestions(updatedQuestions);
    saveQuestions(updatedQuestions);

    setQuestion('');
    setEmail('');
    setDonation('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-card">
        <div className="brand-header">
          Send my question online and in first position
        </div>

        <div>
          <label htmlFor="question" className="section-label">
            Indicate your question for receive response
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="input-lg mb-5"
            placeholder="TYPE YOUR QUESTION HERE"
          />
        </div>

        <div>
          <label htmlFor="email" className="section-label">
            Indicate your email for receive response
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-lg mb-5"
            autoComplete="email"
            placeholder="YOUR@EMAIL.COM"
          />
        </div>

        <div>
          <label htmlFor="donation" className="section-label">
            Donations by PayPal that you will give for response
          </label>
          <input
            type="number"
            id="donation"
            value={donation}
            min="0"
            onChange={(e) => setDonation(e.target.value)}
            required
            className="input-lg mb-6"
            placeholder="100 $"
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Question
        </button>
      </form>

      <section className="max-w-xl mx-auto mt-10 px-6 w-full">
        <h3 className="text-xl font-bold text-brandText mb-4">Recent Questions</h3>
        {questions.length === 0 && (
          <p className="text-gray-600">No questions asked yet.</p>
        )}
        <ul className="space-y-4">
          {questions.map(({ id, question, email, donation, timestamp }) => (
            <li key={id} className="bg-white rounded-lg shadow-md p-4 border border-silver">
              <div className="text-gray-800 font-semibold mb-1">{question}</div>
              <div className="text-sm text-gray-500 mb-1">
                <span>Email: </span><a href={`mailto:${email}`} className="text-blue-600 underline">{email}</a>
              </div>
              <div className="text-sm text-gray-500 mb-1">Donation: {donation} $</div>
              <div className="text-xs text-gray-400">
                Asked at {new Date(timestamp).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
