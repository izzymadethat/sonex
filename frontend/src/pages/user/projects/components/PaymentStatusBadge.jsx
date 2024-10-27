import { Badge } from "@/components/ui/badge";
import { Ban, CheckCircle2 } from "lucide-react";

const badgeStyles = {
  paid: "text-xs bg-green-500 text-green-50 flex items-center hover:bg-green-600 gap-1.5",
  noCharge:
    "text-xs bg-gray-500 text-gray-50 flex items-center gap-1.5 hover:bg-gray-600"
};

const PaymentStatusBadge = ({ paymentStatus }) => {
  if (paymentStatus === "paid") {
    return (
      <Badge className={badgeStyles.paid}>
        <CheckCircle2 /> PAID
      </Badge>
    );
  }

  if (paymentStatus === "no-charge") {
    return (
      <Badge className={badgeStyles.noCharge}>
        <Ban /> FREE
      </Badge>
    );
  }
  return <Badge className="text-xs">UNPAID</Badge>;
};
export default PaymentStatusBadge;
