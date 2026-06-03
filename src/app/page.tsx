'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 sm:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-amber-100 rounded-full mb-6">
              <p className="text-sm font-semibold text-amber-800">Available for opportunities</p>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Software Engineer focused on <span className="text-amber-700">Manufacturing & Production Reliability</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              Sr. Application Support Engineer at Tesla with expertise in Python, SQL, ERP systems, and DevOps. Passionate about automation, system reliability, and solving complex manufacturing challenges through data-driven diagnostics and intelligent workflows.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition">
                Get in Touch
              </button>
              <button className="px-8 py-3 border-2 border-amber-700 text-amber-700 rounded-lg font-semibold hover:bg-amber-50 transition">
                View My Work
              </button>
            </div>
          </div>

          {/* Profile Photo */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-80 h-80 relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/ProfilePic.jpeg"
                alt="Karan Gupta"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">My Journey</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Currently serving as Sr. Application Support Engineer at Tesla, where I've built Python/SQL automation scripts and monitoring workflows that improved issue detection and reduced downtime by ~30%. My experience spans manufacturing systems, ERP platforms, cloud operations, and DevOps.
            </p>
            <p className="text-gray-600 leading-relaxed">
              I hold a B.S. in Computer Science from San Francisco State University and am pursuing an Evening MBA from Santa Clara University. I'm passionate about leveraging AI, IoT, and automation to solve manufacturing challenges and drive operational excellence.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What I Do</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-2xl">🔧</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Automation & DevOps</h4>
                  <p className="text-sm text-gray-600">Python/SQL scripts, Splunk, Grafana, Kubernetes</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-2xl">⚙️</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Manufacturing Systems</h4>
                  <p className="text-sm text-gray-600">ERP systems, Oracle, production reliability</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Data & Analytics</h4>
                  <p className="text-sm text-gray-600">SQL queries, data validation, root-cause analysis</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Skills & Expertise</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Python', 'SQL', 'Splunk', 'Grafana', 'Oracle', 'Kubernetes', 'Docker', 'REST APIs', 'MySQL', 'JavaScript', 'SAP ABAP', 'Git'].map((skill) => (
            <div
              key={skill}
              className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center hover:bg-amber-100 transition"
            >
              <p className="font-semibold text-amber-900">{skill}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 bg-amber-50 rounded-2xl text-center mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Let's work together</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          I'm always interested in hearing about new projects and opportunities.
        </p>
        <button className="px-8 py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition">
          Start a Conversation
        </button>
      </section>
    </div>
  );
}
