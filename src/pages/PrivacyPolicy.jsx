import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50">
        {/* Header */}
        <div className="text-center pt-4">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Policy Sections */}
            <div className="divide-y divide-gray-100 ">
              <Section
                title="1. Introduction"
                content="Welcome to Blogify ('we,' 'our,' or 'us'). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and share your personal information when you use our application."
              />

              <Section
                title="2. Information We Collect"
                content={
                  <>
                    We collect information you provide directly to us when you:
                    <List
                      items={[
                        "Create an account",
                        "Publish content on our platform",
                        "Subscribe to newsletters",
                        "Contact us for support",
                      ]}
                    />
                    This may include your name, email address, profile
                    information, and any content you publish.
                  </>
                }
              />

              <Section
                title="3. How We Use Your Information"
                content={
                  <>
                    We use the information we collect to:
                    <List
                      items={[
                        "Provide, maintain, and improve our services",
                        "Personalize your experience",
                        "Communicate with you about your account",
                        "Monitor and analyze usage patterns",
                        "Ensure the security of our platform",
                      ]}
                    />
                  </>
                }
              />

              <Section
                title="4. Information Sharing"
                content={
                  <>
                    We do not sell your personal information. We may share
                    information with:
                    <List
                      items={[
                        "Service providers who assist in our operations",
                        "Legal authorities when required by law",
                        "Other users as part of your public profile (when applicable)",
                      ]}
                    />
                  </>
                }
              />

              <Section
                title="5. Data Security"
                content="We implement appropriate technical and organizational measures to protect your personal information. However, no internet transmission is completely secure, and we cannot guarantee absolute security."
              />

              <Section
                title="6. Your Rights"
                content={
                  <>
                    Depending on your location, you may have rights to:
                    <List
                      items={[
                        "Access, correct, or delete your personal information",
                        "Object to or restrict processing of your data",
                        "Request a copy of your data in a portable format",
                      ]}
                    />
                  </>
                }
              />

              <Section
                title="7. Changes to This Policy"
                content="We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on our website and updating the 'Last updated' date."
              />

              <Section
                title="8. Contact Us"
                content={
                  <>
                    If you have questions about this Privacy Policy, please
                    contact us at:
                    <div className="mt-4  p-4 rounded-lg">
                      <p className="font-medium text-blue-800">
                        <span className="text-navy-700">Email:</span>{" "}
                        privacy@blogify.com
                      </p>
                    </div>
                  </>
                }
              />
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        :root {
          --color-navy-800: #1e3a8a;
          --color-navy-700: #1e40af;
        }
        .bg-navy-800 {
          background-color: var(--color-navy-800);
        }
        .text-navy-700 {
          color: var(--color-navy-700);
        }
      `}</style>
    </>
  );
};

// Reusable Section Component
const Section = ({ title, content }) => (
  <section className="p-8  transition-colors duration-200">
    <h2 className="text-2xl font-bold text-navy-700 mb-4">{title}</h2>
    <div className="text-gray-700 leading-relaxed">{content}</div>
  </section>
);

// Reusable List Component
const List = ({ items }) => (
  <ul className="list-disc pl-6 my-4 space-y-2">
    {items.map((item, index) => (
      <li key={index} className="text-gray-700">
        {item}
      </li>
    ))}
  </ul>
);

export default PrivacyPolicy;
