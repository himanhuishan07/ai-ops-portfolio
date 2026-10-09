import { Github, Linkedin, Instagram, Phone, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center">
      {/* Call to Action Section */}
      <div className="w-full max-w-4xl px-6 py-24 text-center flex flex-col items-center">
        <div className="flex items-center justify-center mb-6">
          <div className="h-[3px] w-12 bg-cyan-600 mr-2 rounded-full"></div>
          <div className="h-[3px] w-4 bg-cyan-600 mr-1 rounded-full"></div>
          <div className="h-[3px] w-2 bg-cyan-600 rounded-full"></div>
        </div>
        
        <h2 className="text-5xl font-extrabold text-White-900 mb-6 tracking-tight">
          Initialize Collaboration
        </h2>
        <p className="text-White-600 mb-10 max-w-2xl text-center text-lg leading-relaxed">
          Always open to exploring sophisticated architectures. Join my network to discuss production-grade machine learning models, edge vision pipelines, and high-throughput deployments.
        </p>
        
        <a 
          href="mailto:gaurhimanshu164@gmail.com" 
          className="bg-gray-900 hover:bg-cyan-700 text-white px-10 py-4 rounded-full font-bold tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-cyan-500/30 transform hover:-translate-y-1"
        >
          Establish Connection
        </a>
      </div>

      {/* Dark Footer Grid */}
      <div className="w-full bg-[#0b1120] text-gray-300 py-16 px-6 lg:px-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-sm">
          
          {/* Communication Nodes */}
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-white text-lg font-bold mb-2 tracking-widest uppercase">Communication Nodes</h3>
            
            <a href="https://wa.me/917042946992" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
              <Phone className="w-4 h-4 text-cyan-600" /> <span className="font-mono">+91 7042946992</span>
            </a>
            
            <a href="https://instagram.com/gaurhimanshu900" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
              <Instagram className="w-4 h-4 text-cyan-600" /> <span className="font-mono">@gaurhimanshu900</span>
            </a>
            
            <a href="https://github.com/himanshuishan07" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
              <Github className="w-4 h-4 text-cyan-600" /> <span className="font-mono">/himanshuishan07</span>
            </a>

            <a href="https://discord.com/channels/1390971850997371000/1390971850997371003" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
              <MessageSquare className="w-4 h-4 text-cyan-600" /> <span className="font-mono">HG // Discord Server</span>
            </a>

            <a href="https://linkedin.com/in/himanshu-gaur-bb37a8241" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
              <Linkedin className="w-4 h-4 text-cyan-600" /> <span className="font-mono">in/himanshu-gaur</span>
            </a>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start">
            <h3 className="text-white text-lg font-bold mb-6 tracking-widest uppercase">Global Routing</h3>
            <p className="mb-3 hover:text-white transition-colors cursor-pointer">Engineering Capabilities</p>
            <p className="mb-3 hover:text-white transition-colors cursor-pointer">Production Workloads</p>
            <p className="mb-3 hover:text-white transition-colors cursor-pointer">Career Telemetry</p>
            <p className="mb-3 hover:text-white transition-colors cursor-pointer">System Architecture</p>
          </div>

          {/* Subscribe / Ping Form */}
          <div className="flex flex-col items-start">
            <h3 className="text-white text-lg font-bold mb-6 tracking-widest uppercase">System Insights</h3>
            <p className="mb-6 text-gray-400 leading-relaxed">
              Subscribe for periodic telemetry on my latest open-source ML pipelines, hardware acceleration benchmarks, and AI engineering notes.
            </p>
            <div className="flex w-full group relative">
              <input 
                type="email" 
                placeholder="Enter Email Address" 
                className="bg-[#151f32] text-white px-5 py-3 flex-grow outline-none border border-gray-700 focus:border-cyan-500 rounded-l-md transition-colors w-full" 
              />
              <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 font-bold uppercase tracking-wider rounded-r-md transition-colors">
                Ping
              </button>
            </div>
          </div>
        </div>

        {/* Copyright & Status */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">© 2026 HIMANSHU GAUR. ALL SYSTEMS OPERATIONAL.</p>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <p className="font-mono text-gray-400 tracking-widest">SYSTEM ONLINE</p>
          </div>
        </div>
      </div>
    </footer>
  );
}