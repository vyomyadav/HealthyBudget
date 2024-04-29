import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import BudgetForm from "../BudgetForm/BudgetForm"; // Your new form for budgets
import BudgetItem from "../BudgetItem/BudgetItem"; // Your new item for budgets
import { useGlobalContext } from "../context/globalContext";

function Budgets() {
    const {
        budgets, 
        getBudgets, 
        deleteBudget
    } = useGlobalContext();

    useEffect(() => {
        getBudgets(); // This fetches all budgets
    }, []);

    return (
        <BudgetStyled>
            <InnerLayout>
                <h1>Budgets</h1>
                <div className="budget-content">
                    <div className="form-container">
                        <BudgetForm />
                    </div>
                    <div className="budgets">
                        {budgets.map((budget) => {
                            const { id, title, amount, date, description } = budget;
                            return <BudgetItem
                                key={id}
                                id={id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                indicatorColor="var(--color-green)"
                                deleteItem={() => deleteBudget(id)}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </BudgetStyled>
    )
}

const BudgetStyled = styled.div`
    display: flex;
    overflow: auto;
    .budget-content{
        display: flex;
        gap: 2rem;
        .budgets{
            flex: 1;
        }
    }
`;

export default Budgets;