import "./index.css"

function App() {
  return (
    <div className="min-h-screen font-sans text-gray-800">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-sm">
        <h1 className="text-xl font-semibold">Jermaine</h1>
        <div className="space-x-6 text-sm">
          <a href="#about" className="hover:text-gray-500">About</a>
          <a href="#projects" className="hover:text-gray-500">Projects</a>
          <a href="#contact" className="hover:text-gray-500">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h2 className="text-4xl font-bold mb-4">
          Hi, I'm Jermaine
        </h2>
        <p className="text-lg text-gray-600 max-w-xl">
          Developer focused on IoT, machine learning systems, and modern web applications.
        </p>

        <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:opacity-80 transition">
          View My Work
        </button>
      </section>

      {/* About */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-20">
        <h3 className="text-2xl font-semibold mb-6">About Me</h3>
        <p className="text-gray-600 leading-relaxed">
          I'm a developer working on hardware-software integrated systems such as posture
          monitoring devices using sensors and machine learning. I enjoy building
          practical solutions that combine embedded systems, APIs, and modern web apps.
        </p>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-20">
        <h3 className="text-2xl font-semibold mb-8">Projects</h3>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="font-semibold mb-2">PostureSense</h4>
            <p className="text-sm text-gray-600">
              IoT posture monitoring system using sensors and machine learning.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="font-semibold mb-2">Drone Controller</h4>
            <p className="text-sm text-gray-600">
              ESP-based drone with custom controller integration.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="font-semibold mb-2">Route Finder</h4>
            <p className="text-sm text-gray-600">
              Navigation app using OpenRouteService with location history.
            </p>
          </div>

        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="text-center py-20">
        <h3 className="text-2xl font-semibold mb-4">Contact</h3>
        <p className="text-gray-600 mb-6">
          Feel free to reach out for collaborations or projects.
        </p>

        <button className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-80">
          Email Me
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6">
        © 2026 Jermaine. All rights reserved.
      </footer>

    </div>
  );
}

export default App;