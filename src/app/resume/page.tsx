'use client';

export default function Resume() {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Resume</h1>
            <p className="text-xl text-gray-600">
              Experience, Education & Skills
            </p>
          </div>
          <a
            href="/Karan Gupta Resume.pdf"
            download="Karan Gupta Resume.pdf"
            className="inline-block px-8 py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition shrink-0"
          >
            Download Full Resume
          </a>
        </div>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-amber-200">
            Experience
          </h2>
          <div className="space-y-8">
            {[
              {
                title: "Sr. Application Support Engineer",
                company: "Tesla, Inc.",
                period: "Nov 2020 - Present",
                description: "Built Python/SQL automation scripts and monitoring workflows for factory software systems, improving issue detection and reducing downtime by ~30%. Engineered observability workflows using Splunk, Grafana, and SolarWinds to accelerate root-cause analysis. Developed Claude Code-based custom skill/plugin to streamline application integration and reduce manual debugging effort by ~30%. Automated data validation, migration, and REST API-based workflows to improve data accuracy and operational speed across manufacturing systems.",
                skills: ["Python", "SQL", "Splunk", "Grafana", "SolarWinds", "Kubernetes", "Docker"]
              },
              {
                title: "Support Engineer",
                company: "Inspyrus, Inc.",
                period: "Sept 2018 - Nov 2020",
                description: "Resolved technical and product issues for enterprise clients ensuring high satisfaction. Supported cloud operations and collaborated with engineering teams to optimize product capabilities. Implemented and optimized ERP systems, Oracle servers, and tools such as Oracle WEC, WFR, WCC, and EM for scalability and reliability. Aligned technical work with business objectives to drive measurable improvements in client outcomes.",
                skills: ["Oracle 11g/12c", "ERP Systems", "Cloud Operations", "MySQL"]
              },
              {
                title: "Software Engineering Intern",
                company: "Ernst & Young (EY)",
                period: "Jun 2017 - Aug 2017",
                description: "Developed data analysis algorithms and reformatted datasets to improve data accuracy and reporting quality. Gained hands-on experience with SAP ABAP while collaborating with Intex consultants on multiple projects. Managed large datasets, populated databases, and extracted insights using MySQL to support data-driven decision-making.",
                skills: ["SAP ABAP", "MySQL", "Data Analysis"]
              },
              {
                title: "Website Developer",
                company: "Henry Harvin India Education LLP",
                period: "Jun 2016 - Aug 2016",
                description: "Developed and deployed frontend web solutions using HTML, JavaScript, and CSS via GoDaddy hosting. Designed and implemented interactive features including chat interfaces and responsive page layouts. Managed backend database structures and email tracking systems using MySQL, ensuring data accuracy and reliable reporting.",
                skills: ["HTML", "JavaScript", "CSS", "MySQL"]
              },
              {
                title: "Software Engineering Intern",
                company: "KPMG",
                period: "Jul 2015 - Aug 2015",
                description: "Integrated and structured large heterogeneous datasets, designing specialized database schemas to improve data organization and query efficiency. Conducted statistical analysis and developed reusable Python scripts to automate processing and derive actionable insights. Applied findings from both primary and secondary data sources to support strategic business decisions.",
                skills: ["Python", "MySQL", "Data Analysis", "Statistical Analysis"]
              }
            ].map((job, index) => (
              <div key={index} className="border-l-4 border-amber-700 pl-6">
                <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                <p className="text-amber-700 font-semibold">{job.company}</p>
                <p className="text-gray-500 text-sm mb-3">{job.period}</p>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-amber-200">
            Education
          </h2>
          <div className="space-y-8">
            {[
              {
                degree: "Evening MBA",
                school: "Santa Clara University",
                period: "March 2024 - Ongoing",
                details: "Focus on business strategy and management"
              },
              {
                degree: "Bachelor of Science in Computer Science",
                school: "San Francisco State University",
                period: "August 2014 - May 2018",
                details: "Relevant Coursework: Software Engineering, Database Systems, Algorithms"
              }
            ].map((edu, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-amber-200">
                <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-amber-700 font-semibold">{edu.school}</p>
                <p className="text-gray-500 text-sm mb-2">{edu.period}</p>
                <p className="text-gray-600">{edu.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-amber-200">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { category: "Languages", skills: ["Python", "SQL", "JavaScript", "HTML", "CSS", "SAP ABAP"] },
              { category: "Backend / APIs", skills: ["REST APIs", "Postman", "API Testing", "Data Validation", "JSON"] },
              { category: "Databases", skills: ["MySQL", "Oracle 11g/12c", "SQL Queries", "Data Migration"] },
              { category: "DevOps & Monitoring", skills: ["Splunk", "Grafana", "SolarWinds", "Kubernetes", "Docker", "Git"] }
            ].map((skillGroup, index) => (
              <div key={index}>
                <h3 className="font-bold text-gray-900 mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
