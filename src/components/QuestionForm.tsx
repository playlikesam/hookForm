import { useState, useEffect } from 'react';
import ReactModal from "react-modal";

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
  const [showAdModal, setShowAdModal] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<QuestionData | null>(null);

  useEffect(() => {
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
    setPendingQuestion(newQuestion);
    setShowAdModal(true);
  };

  const handleAdFinished = () => {
    if (pendingQuestion) {
      const updatedQuestions = [pendingQuestion, ...questions].slice(0, 10);
      setQuestions(updatedQuestions);
      saveQuestions(updatedQuestions);
      setQuestion('');
      setEmail('');
      setDonation('');
      setPendingQuestion(null);
    }
    setShowAdModal(false);
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

      <ReactModal
        isOpen={showAdModal}
        onRequestClose={() => setShowAdModal(false)}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            position: "relative",
            inset: "auto",
            maxWidth: 440,
            width: "90%",
            borderRadius: 20,
            padding: "30px 25px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            textAlign: "center",
            direction: "ltr",
          },
        }}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-extrabold mb-4 text-primary-dark">
            Rewarded Ad
          </h2>

          <p className="mb-6 text-gray-700 text-lg px-2">
            Please watch this rewarded ad to complete your question submission.
            <br />
            (This is a simulation. A real AdMob video will appear here in production.)
          </p>

          <div className="w-full bg-gray-300 rounded-lg overflow-hidden relative h-4 mb-5">
            <div
              className="bg-primary absolute top-0 left-0 h-4 transition-all duration-[3000ms] ease-in-out"
              style={{ width: showAdModal ? "100%" : "0%" }}
            ></div>
          </div>

          <button
            onClick={handleAdFinished}
            className="submit-btn px-10 py-3 text-lg"
          >
            Finish Ad & Submit Question
          </button>
        </div>
      </ReactModal>

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
