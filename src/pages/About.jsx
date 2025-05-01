import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  PenTool,
  Users,
  User,
  Zap,
  ArrowRight,
  Star,
  BarChart2,
  Hash,
  Award,
} from "lucide-react";

function About() {
  return (
    <section className="relative py-20 px-4 sm:px-8 bg-slate-50 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#1e53a2]/10 blur-3xl"></div>

      {/* Section Header with Animated Underline */}
      <div className="max-w-6xl mx-auto text-center mb-20 relative">
        <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-[#1e53a2] bg-blue-50 rounded-full">
          Why Blogify?
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          The Modern Platform for{" "}
          <span className="relative">
            <span className="relative z-10">Thought Leaders</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-200/50 z-0"></span>
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Where your words meet the right audience. Publish, connect, and grow
          with our powerful tools.
        </p>
      </div>

      {/* Features Grid with Image Placeholders */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        {/* Left Column - Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl h-96 bg-gradient-to-br from-[#1e53a2] to-blue-400 flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-70"></div>
          <div className="relative z-10 text-white p-8 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Join 10+ Writers</h3>
            <p className="text-blue-100">
              Already sharing their stories on Blogify
            </p>
          </div>
        </div>

        {/* Right Column - Features */}
        <div className="space-y-8">
          {[
            {
              icon: <PenTool className="w-6 h-6 text-[#1e53a2]" />,
              title: "Intuitive Editor",
              desc: "Our distraction-free editor lets you focus on what matters - your content.",
              stat: "95% easier to use",
            },
            {
              icon: <BarChart2 className="w-6 h-6 text-[#1e53a2]" />,
              title: "Smart Analytics",
              desc: "Understand your readers with real-time performance metrics.",
              stat: "300% growth potential",
            },
            {
              icon: <Users className="w-6 h-6 text-[#1e53a2]" />,
              title: "Vibrant Community",
              desc: "Connect with readers and fellow writers in specialized groups.",
              stat: "1M+ monthly interactions",
            },
          ].map((feature, index) => (
            <div key={index} className="flex gap-6 group">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center  group-hover:text-white transition-all">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-2">{feature.desc}</p>
                <span className="inline-flex items-center text-sm font-medium text-[#1e53a2]">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  {feature.stat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto mb-24">
        <div className="bg-blue-50 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#1e53a2]/10 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <Hash className="w-8 h-8 text-[#1e53a2]" />
              <h3 className="text-2xl font-bold text-gray-800">
                What Our Community Says
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "Blogify helped me grow my audience by 400% in just 3 months.",
                  author: "Sarah Johnson",
                  role: "Lifestyle Blogger",
                },
                {
                  quote:
                    "The analytics tools are game-changers for serious content creators.",
                  author: "Michael Chen",
                  role: "Tech Writer",
                },
                {
                  quote:
                    "Finally a platform that values quality writing over algorithms.",
                  author: "Emma Rodriguez",
                  role: "Fiction Author",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex gap-2 text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-[#1e53a2]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-blue-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#1e53a2] to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="relative z-10">
          <Award className="w-12 h-12 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">
            Ready to Start Your Writing Journey?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of writers already growing their audience on Blogify.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-3 bg-white text-[#1e53a2] rounded-full font-bold hover:bg-blue-50 transition"
            >
              Sign Up Free
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
