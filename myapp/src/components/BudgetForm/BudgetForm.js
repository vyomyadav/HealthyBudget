import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { plus } from "../../utils/Icons";
import Button from "../Button/Button";
import { useGlobalContext } from "../context/globalContext";

function BudgetForm() {
    const { addBudget, getBudgets } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: new Date(),
        description: '',
    });

    const { title, amount, date, description } = inputState;

    const handleInput = name => e => {
        const value = e.target ? e.target.value : e;
        setInputState({...inputState, [name]: value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        addBudget(inputState);
        getBudgets(); // Refresh the list of budgets after adding
        setInputState({  // Reset form after submission
            title: '',
            amount: '',
            date: new Date(),
            description: '',
        });
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name={'title'}
                    placeholder="Budget Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input value={amount}  
                    type="number"
                    name={'amount'} 
                    placeholder="Budget Amount"
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Select Date'
                    selected={date}
                    dateFormat="MM/dd/yyyy"
                    onChange={handleInput('date')}
                />
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Description' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Add Budget'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    )
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control {
        input, textarea {
            width: 100%;
        }
    }
    .submit-btn {
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: var(--color-green) !important;
            }
        }
    }
`;

export default BudgetForm;
