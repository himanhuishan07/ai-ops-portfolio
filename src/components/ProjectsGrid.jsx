import projects from "@/data/projects.json";
import { ExternalLink, Github, Cpu } from "lucide-react";

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="group relative bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-6 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
        >
          {/* Top Bar */}
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2.5 py-1 rounded-full">
              {project.category}
            </span>
            <div className="flex space-x-3 text-slate-400">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Telemetry Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-2 bg-slate-900/80 rounded-lg p-3 border border-slate-800/80 mb-4 font-mono text-xs">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key}>
                  <div className="text-slate-500 uppercase">{key}</div>
                  <div className="text-emerald-400 font-semibold">{value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}