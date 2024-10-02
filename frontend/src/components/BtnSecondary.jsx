import "../styles/btn-secondary.css";

const BtnSecondary = ({ icon, text }) => {
  return (
    <button class="btn-secondary">
      <span>{icon}</span>
      <span>{text}</span>
    </button>
  );
};

export default BtnSecondary;
