import TotalSalesCard from "./TotalSalesCard";
import CustomersCard from "./CustomersCard";
import ProductsCard from "./ProductsCard";
import SalesFunnelCard from "./SalesFunnelCard";
import OrdersCard from "./OrdersCard";
import { DashboardProps } from "../../types";
import Link from "next/link";

export default function Dashboard({
  userData,
  productData,
  salesData,
}: DashboardProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/orders">
          <TotalSalesCard salesData={salesData} />
        </Link>
        <Link href="/admin/users">
          <CustomersCard userData={userData} />
        </Link>

        <Link href="/admin/products">
          <ProductsCard productData={productData} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SalesFunnelCard />
        <OrdersCard />
      </div>
    </div>
  );
}
