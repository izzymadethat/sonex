import "../styles/feature-card.css";

const FeatureCard = ({ feature }) => {
  return (
    <div className="bg-[#383838] p-6 rounded-lg shadow-m min-w-[300px]">
      <h3 className="text-[#ffff00] text-xl font-bold mb-2">{feature.title}</h3>
      <ul className="">
        {feature.points.map((point, index) => (
          <li key={index} className="text-[#e8e8e8] list-disc">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureCard;
