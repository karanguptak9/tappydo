'use client';

export default function Projects() {
  type Project = { title: string; description: string; image: string; tags: string[]; link: string; cta?: string };
  const projects: Project[] = [
    {
      title: "Manufacturing Automation Framework",
      description: "Python/SQL automation scripts for factory software systems. Improved issue detection and reduced downtime by ~30% through data-driven diagnostics.",
      image: "🏭",
      tags: ["Python", "SQL", "Automation", "Manufacturing"],
      link: "#"
    },
    {
      title: "Observability & Monitoring Dashboard",
      description: "Custom monitoring workflows using Splunk, Grafana, and SolarWinds to accelerate root-cause analysis and improve incident response quality.",
      image: "📊",
      tags: ["Splunk", "Grafana", "SolarWinds", "DevOps"],
      link: "#"
    },
    {
      title: "ERP System Integration",
      description: "Implemented and optimized Oracle-based ERP systems (WEC, WFR, WCC, EM) for enterprise clients ensuring high reliability and scalability.",
      image: "⚙️",
      tags: ["Oracle", "ERP", "Database", "MySQL"],
      link: "#"
    },
    {
      title: "Claude Code Custom Skill Plugin",
      description: "Developed a Claude Code-based custom skill to streamline application integration and troubleshooting, reducing manual debugging effort by ~30%.",
      image: "🤖",
      tags: ["Claude", "Integration", "Plugin Development"],
      link: "#"
    },
    {
      title: "Data Validation & Migration Pipeline",
      description: "REST API-based workflows for automated data validation, migration, and quality checks across manufacturing systems.",
      image: "🔄",
      tags: ["REST APIs", "Postman", "Data Pipeline", "JSON"],
      link: "#"
    },
    {
      title: "Production Reliability Playbooks",
      description: "Created comprehensive technical playbooks, escalation protocols, and environment setup frameworks for Kubernetes/cloud-supported applications.",
      image: "📋",
      tags: ["Kubernetes", "Docker", "Cloud", "Documentation"],
      link: "#"
    },
    {
      title: "Todo App",
      description: "A simple productivity app to organize tasks. Full features coming soon.",
      image: "✅",
      tags: ["Next.js", "React", "TypeScript", "Productivity"],
      link: "/projects/todo",
      cta: "Open App"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Projects</h1>
          <p className="text-xl text-gray-600">
            A collection of my recent work and side projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-amber-200 to-amber-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="text-6xl">{project.image}</div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                {project.cta ? (
                  <div className="mt-4">
                    <span className="inline-block px-4 py-2 bg-amber-700 text-white text-sm font-semibold rounded-lg group-hover:bg-amber-800 transition">
                      {project.cta} →
                    </span>
                  </div>
                ) : (
                  <div className="mt-4 text-amber-700 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                    Learn more →
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* CTA Section */}
        <section className="mt-20 bg-amber-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Have a project in mind?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm always interested in collaborating on exciting projects. Let's discuss your idea.
          </p>
          <button className="px-8 py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition">
            Get in Touch
          </button>
        </section>
      </div>
    </div>
  );
}
