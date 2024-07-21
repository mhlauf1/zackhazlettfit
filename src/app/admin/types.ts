export type SalesDataProps = {
    amount: number;
    numberOfSales: number;
};

export type UserDataProps = {
    userCount: number;
    averageValuePerUser: number;
};

export type ProductDataProps = {
    activeCount: number;
    inactiveCount: number;
};

export type DashboardProps = {
    salesData: SalesDataProps;
    userData: UserDataProps;
    productData: ProductDataProps;
};