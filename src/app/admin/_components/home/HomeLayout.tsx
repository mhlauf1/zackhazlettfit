import SideBar from "../SideBar";
import TopBar from "../TopBar";
import Dashboard from "./Dashboard";
import { SalesDataProps, UserDataProps, ProductDataProps } from "../../types";
import { PageHeader } from "../PageHeader";

type HomeLayoutProps = {
  salesData: SalesDataProps;
  userData: UserDataProps;
  productData: ProductDataProps;
};

export default function HomeLayout({
  salesData,
  userData,
  productData,
}: HomeLayoutProps) {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const currentDate = today.toLocaleDateString(undefined, options);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <PageHeader>Sales Analysis</PageHeader>
        <span>{currentDate}</span>
      </div>
      <Dashboard
        salesData={salesData}
        userData={userData}
        productData={productData}
      />
    </div>
  );
}
