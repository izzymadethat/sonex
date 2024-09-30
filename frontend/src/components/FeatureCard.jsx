import "../styles/feature-card.css";

const FeatureCard = ({ feature }) => {
  return (
    <div className="bg-[#383838] p-8 rounded-lg shadow-m w-[300px] h-[250px] max-h-[250px]">
      <h3 className="text-primary text-xl font-bold mb-2 text-center">
        {feature.title}
      </h3>
      <ul className="space-y-4">
        {feature.points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureCard;
