'use client';

export default function Research() {
  const papers = [
    {
      title: "Application of Predictive Maintenance in Manufacturing with the utilization of AI and IoT Tools",
      abstract: "An in-depth exploration of predictive maintenance strategies leveraging artificial intelligence and IoT technologies to improve equipment reliability and reduce downtime in manufacturing environments.",
      date: "2024",
      tags: ["AI", "IoT", "Manufacturing", "Predictive Maintenance"],
      link: "#"
    },
    {
      title: "Reducing Costs and Maximizing Efficiency in Solid-State Lithium Battery Production: A Roll-to-Roll Processing Approach",
      abstract: "A comprehensive analysis of advanced manufacturing techniques for solid-state lithium batteries, focusing on roll-to-roll processing to optimize production efficiency and reduce manufacturing costs.",
      date: "2024",
      tags: ["Lithium Batteries", "Manufacturing", "Cost Optimization"],
      link: "#"
    },
    {
      title: "Circular Economy in Lithium Battery Manufacturing: Recycling Waste for a Sustainable Future",
      abstract: "Examining sustainable practices in battery manufacturing through circular economy principles, with emphasis on waste reduction and material recycling.",
      date: "2024",
      tags: ["Sustainability", "Circular Economy", "Battery Manufacturing"],
      link: "#"
    },
    {
      title: "Development of safe lithium-ion batteries using PEO and PVDF in electrolyte",
      abstract: "Technical research on electrolyte composition optimization for enhanced safety and performance in lithium-ion battery development.",
      date: "2023",
      tags: ["Battery Chemistry", "Materials Science", "Safety"],
      link: "#"
    },
    {
      title: "Predictive Maintenance Using AI and IoT in Manufacturing",
      abstract: "Advanced techniques for implementing predictive maintenance systems using machine learning and IoT sensors to prevent equipment failures.",
      date: "2023",
      tags: ["AI", "IoT", "Manufacturing", "ML"],
      link: "#"
    },
    {
      title: "Cost Efficiency and Recall Management in the Automotive Industry: A Comparative Study of Tesla, Ford, and Toyota",
      abstract: "Comparative analysis of cost management and recall mitigation strategies across leading automotive manufacturers.",
      date: "2023",
      tags: ["Automotive", "Cost Analysis", "Quality Management"],
      link: "#"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Research & Papers</h1>
          <p className="text-xl text-gray-600">
            Exploring ideas at the intersection of technology, design, and innovation
          </p>
        </div>

        {/* Papers List */}
        <div className="space-y-6">
          {papers.map((paper, index) => (
            <a
              key={index}
              href={paper.link}
              className="group block bg-white rounded-lg border border-gray-200 p-8 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Date */}
              <p className="text-sm text-gray-500 mb-2">{paper.date}</p>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition">
                {paper.title}
              </h3>

              {/* Abstract */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {paper.abstract}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {paper.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read More */}
              <div className="text-amber-700 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                Read full paper →
              </div>
            </a>
          ))}
        </div>

        {/* Subscribe Section */}
        <section className="mt-20 bg-amber-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to get notified when I publish new research and papers.
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-white border border-amber-200 rounded-lg focus:outline-none focus:border-amber-700"
            />
            <button className="px-8 py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
