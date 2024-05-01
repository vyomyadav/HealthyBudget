import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import { plus } from '../../utils/Icons';
import Button from '../Button/Button';
import { useGlobalContext } from '../context/globalContext';

function ExpenseForm() {
    const { addTransaction, getTransactions, error, setError } = useGlobalContext(); // Updated to use addTransaction
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: new Date(), // Set default to new Date()
        category: '',
        description: '',
        type: 'expense' // Explicitly setting the transaction type
    });

    const [peopleCount, setPeopleCount] = useState(1);
    const [emailAddresses, setEmailAddresses] = useState([]);


    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        const value = e.target ? e.target.value : e;
        setInputState({...inputState, [name]: value});
        setError('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        addTransaction(inputState); // Using the unified addTransaction method
        getTransactions(); // Update the list after adding
        setInputState({ // Reset form fields
            title: '',
            amount: '',
            date: new Date(),
            category: '',
            description: '',
            type: 'expense' // Reset type to ensure it's always set to expense
        });
    }

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name={'title'} 
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input 
                    type="number" // Changing to type number for better validation
                    value={amount}
                    name={'amount'} 
                    placeholder={'Expense Amount'}
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="MM/dd/yyyy"
                    onChange={(newDate) => {
                        setInputState({...inputState, date: newDate})
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea 
                    name="description" 
                    value={description} 
                    placeholder='Add A Reference' 
                    id="description" 
                    cols="30" 
                    rows="4" 
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Add Expense'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                />
            </div>
        </ExpenseFormStyled>
    )
}

const ExpenseFormStyled = styled.form`
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
        justify-content: flex ;
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
export default ExpenseForm