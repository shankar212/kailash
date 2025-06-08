import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyB2pHACjalKyJFShn1xnUpLvWnp1aG2giA";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export default function DoctorChatbot() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("english");
  const [error, setError] = useState("");

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResponse("");

    if (!input.trim()) {
      setError("⚠️ Please enter patient's symptoms.");
      return;
    }

    setLoading(true);
    setResponse("🩺 Generating diagnosis and treatment suggestions...");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const imageParts = image
        ? [
            {
              inlineData: {
                mimeType: image.type,
                data: (await toBase64(image)).split(",")[1],
              },
            },
          ]
        : [];

      const prompt = `
You are a trusted medical AI assistant supporting a licensed doctor.

Patient symptoms:
"${input.trim()}"

${image ? "An image of the condition is provided." : ""}

Please provide:
- Likely diagnosis
- Symptoms summary
- Evidence-based treatment options
- Important red flags
- Suggested tests if needed

Respond professionally without disclaimers.

${language === "hindi-roman"
        ? "Translate your entire answer into Hindi using Roman script (English letters). Avoid technical English unless necessary."
        : ""}
      `;

      const result = await model.generateContent({
        contents: [{ parts: [{ text: prompt }, ...imageParts], role: "user" }],
      });

      const generated = await result.response.text();
      setResponse(generated.trim());
    } catch (err) {
      console.error(err);
      setResponse("❌ Failed to generate a response. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderResponse = (text: string) => {
    return (
      <pre className="whitespace-pre-wrap font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 p-4 rounded-lg overflow-x-auto animate-fadeIn">
        {text}
      </pre>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Navbar />

      {/* Sticky Header with shimmer */}
      <header className="sticky top-0 bg-white dark:bg-gray-900 shadow-md z-20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-center">
          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 select-none tracking-wide relative overflow-hidden">
            <span className="animated-gradient bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 bg-clip-text text-transparent animate-shimmer">
              Doctor's AI Companion
            </span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
        {/* Left - Input Form with fade and slide */}
        <section className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col animate-fadeSlideIn">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 flex-grow">
            <label
              htmlFor="symptoms"
              className="font-semibold text-gray-700 dark:text-gray-300 text-lg"
            >
              Enter Patient's Symptoms:
            </label>
            <textarea
              id="symptoms"
              placeholder="Describe patient's symptoms here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              required
              className="resize-none border border-gray-300 dark:border-gray-700 p-5 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100 transition shadow-md"
              spellCheck={false}
            />

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <label
                htmlFor="language"
                className="font-semibold text-gray-700 dark:text-gray-300 min-w-[140px]"
              >
                Response Language:
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 p-3 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100 transition w-full sm:w-auto"
              >
                <option value="english">English</option>
                <option value="hindi-roman">Hindi (Roman Script)</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <label
                htmlFor="image-upload"
                className="font-semibold text-gray-700 dark:text-gray-300 min-w-[140px]"
              >
                Upload Image (optional):
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                className="border border-gray-300 dark:border-gray-700 p-3 rounded-md cursor-pointer dark:bg-gray-800 dark:text-gray-100 transition w-full sm:w-auto"
              />
            </div>

            {error && (
              <p className="text-red-600 font-semibold mt-2 text-center animate-shake">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`mt-auto py-4 rounded-xl font-semibold text-white transition
                ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-800 cursor-pointer shadow-lg hover:shadow-[0_0_20px_#2563eb]"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  🔄 Analyzing...
                </span>
              ) : (
                "Generate Diagnosis"
              )}
            </button>
          </form>
        </section>

        {/* Right - Response Panel with fade and slide */}
        <section className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-inner p-8 flex flex-col max-h-[75vh] overflow-y-auto animate-fadeSlideIn">
          <h2 className="font-extrabold text-3xl mb-6 text-blue-700 dark:text-blue-400 select-none tracking-wide">
            🧠 AI Diagnostic Suggestion:
          </h2>
          {response ? (
            renderResponse(response)
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic select-none text-center mt-12">
              Your diagnosis will appear here after you submit symptoms.
            </p>
          )}
        </section>
      </main>

      <Footer />

      {/* Custom animation styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite linear;
          background-size: 200% 100%;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }

        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlideIn {
          animation: fadeSlideIn 0.8s ease forwards;
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          20%, 60% {
            transform: translateX(-6px);
          }
          40%, 80% {
            transform: translateX(6px);
          }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}
