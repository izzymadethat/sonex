import { ArrowLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NavigateBackTo = ({ route, pageName }) => {
  return (
    <Link
      to={route}
      className="flex gap-1 text-xs transition-transform duration-300 hover:text-primary hover:scale-105"
    >
      <ArrowLeftCircle size={18} /> Back to {pageName.toLowerCase()}
    </Link>
  );
};
export default NavigateBackTo;
