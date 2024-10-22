import { Button } from "@/components/ui/button";
import { Music2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const RecentProjects = ({ projects }) => {
  const navigate = useNavigate();
  const renderRecentProjects = projects.slice(0, 4).map((project) => {
    return (
      <article
        className="flex items-center justify-center gap-1 p-4 rounded-md shadow-md cursor-pointer bg-secondary hover:bg-primary hover:text-secondary"
        key={project.id}
        onClick={() => navigate(`/user/me/projects/${project.id}`)}
      >
        <span>
          <Music2 />
        </span>

        <span className="font-bold uppercase">{project.title}</span>
      </article>
    );
  });

  return (
    <section className="w-full p-6 px-8 mb-6 space-y-4 border rounded-md shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-bold uppercase">Recent Projects:</h3>
        <p className="italic">Get back to it...</p>
      </div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 max-h-[225px] lg:max-h-[300px] overflow-scroll px-6 lg:px-0">
        {renderRecentProjects}
      </div>
      <Button onClick={() => navigate("/user/me/projects")}>
        View All Projects
      </Button>
    </section>
  );
};

export default RecentProjects;
