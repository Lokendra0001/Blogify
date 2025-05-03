import { Mail, MessageSquareMore } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        navigate("/myAccount");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-[#1A51A1] mb-2">Contact Us</h2>
        <p className="text-gray-500">We'd love to hear from you!</p>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg text-center">
          Message sent! We'll respond soon.
        </div>
      )}

      {/* Message Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div>
          <div className="flex items-center mb-1">
            <Mail className="w-4.5 h-4.5 ml-1 mr-2 text-blue-500"></Mail>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Your Email
            </label>
          </div>
          <input
            type="email"
            id="email"
            autoComplete="off"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500  transition placeholder-gray-400 outline-none"
            placeholder="your@email.com"
            required
          />
        </div>

        {/* Message Field */}
        <div>
          <div className="flex items-center mb-1">
            <MessageSquareMore className="w-5 h-5 ml-1 mr-2 text-blue-600"></MessageSquareMore>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Your Message
            </label>
          </div>
          <textarea
            id="message"
            rows="4"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 outline-none resize-none"
            placeholder="How can we help you?"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex justify-center items-center cursor-pointer ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </form>

      {/* Simple Footer */}
      <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
        <p>We typically respond within 24 hours</p>
      </div>
    </div>
  );
};

export default Message;
