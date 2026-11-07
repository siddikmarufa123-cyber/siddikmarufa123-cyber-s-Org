import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { QuizQuestion } from '../../types/lms';

interface QuizModuleProps {
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
}

export const QuizModule: React.FC<QuizModuleProps> = ({ questions, onComplete }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIdx: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (onComplete) onComplete(score);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const passed = score >= Math.ceil(questions.length / 2);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h4 className="font-bold text-slate-900 text-sm font-bangla">
            অধ্যায়ের কুইজ মূল্যায়ন পরীক্ষা
          </h4>
          <p className="text-xs text-slate-500 font-bangla">
            সঠিক উত্তর নির্বাচন করে আপনার স্কিল যাচাই করুন (মোট {questions.length} টি প্রশ্ন)
          </p>
        </div>
        {submitted && (
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold font-bangla ${
                passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}
            >
              স্কোর: {score} / {questions.length} ({passed ? 'উত্তীর্ণ' : 'পুনরায় চেষ্টা করুন'})
            </span>
            <button
              onClick={handleReset}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              title="Reset Quiz"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-5">
        {questions.map((q, qIdx) => {
          const userChoice = selectedAnswers[qIdx];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id || qIdx}
              className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3"
            >
              <div className="font-bold text-slate-900 text-xs sm:text-sm font-bangla flex items-start gap-2">
                <span className="font-mono text-indigo-600 font-semibold">{qIdx + 1}.</span>
                <span>{q.question}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  let btnStyle = 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50';

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-400';
                    } else if (isSelected) {
                      btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 font-semibold';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-indigo-500 bg-indigo-50 text-indigo-900 font-semibold ring-1 ring-indigo-400';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between font-bangla ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                      )}
                      {submitted && isSelected && optIdx !== q.correctIndex && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-600 font-bangla border border-slate-200">
                  <span className="font-bold text-slate-800">ব্যাখ্যা:</span> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length === 0}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors font-bangla"
          >
            কুইজ উত্তর সাবমিট করুন
          </button>
        </div>
      )}
    </div>
  );
};
