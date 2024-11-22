const FeatureCard = ({ feature }) => {
  return (
    <div className="bg-[#383838] p-8 rounded-lg shadow-m w-[300px] h-[250px] max-h-[250px]">
      <h3 className="mb-2 text-xl font-bold text-center text-primary">
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
