import { dashboard, expenses, transactions, trend, users, budgetIcon } from "./Icons"

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Budgets",
        icon: budgetIcon,
        link: "/dashboard",
    },
    {
        id: 6,
        title: "Profile",
        icon: users,
        link: "/profile",
    },
]