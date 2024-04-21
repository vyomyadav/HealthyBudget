import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { plus } from "../../utils/Icons";
import Button from "../Button/Button";
import { useGlobalContext } from "../context/globalContext";

function TransactionForm({ type }) {  // Renamed from Form to TransactionForm
    const { addTransaction, getTransactions } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: new Date(),
        category: '',
        description: '',
        type: type  // Set initial transaction type based on prop
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        const value = e.target ? e.target.value : e;
        setInputState({...inputState, [name]: value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        addTransaction(inputState);
        getTransactions();
        setInputState({
            title: '',
            amount: '',
            date: new Date(),
            category: '',
            description: '',
            type: type
        });
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            <div className="input-control"> 
                <input 
                    type="text" 
                    value={title}
                    name={'title'}
                    placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} Title`}  // Dynamic placeholder based on type
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input value={amount}  
                    type="number"  // Use 'number' type for better validation
                    name={'amount'} 
                    placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} Amount`}  // Dynamic placeholder
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="MM/dd/yyyy"
                    onChange={handleInput('date')}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Select Category</option>
                    {/* Add or adjust categories as needed */}
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Description' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name={`Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
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
    input, textarea, select{
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
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;

export default TransactionForm;