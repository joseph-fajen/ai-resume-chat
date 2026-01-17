import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-2xl font-serif text-foreground mb-2">Joseph Fajen</p>
            <p className="text-muted-foreground">Senior Technical Writer</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/josephfajen7782211/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-secondary rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/joseph-fajen"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-secondary rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="p-3 bg-secondary rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <Mail className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            This portfolio demonstrates AI-queryable professional presentation.
            <br />
            <span className="text-text-subtle">The interface is the proof.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
