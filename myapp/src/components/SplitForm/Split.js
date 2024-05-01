import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

function SplitExpenseModal({ isOpen, onClose, onSubmit, peopleCount, setPeopleCount, setEmailAddresses }) {
    const [localEmailAddresses, setLocalEmailAddresses] = useState([]);

    const handleEmailChange = (index, email) => {
        const updatedEmailAddresses = [...localEmailAddresses];
        updatedEmailAddresses[index] = email;
        setLocalEmailAddresses(updatedEmailAddresses);
    };

    const handleSubmit = () => {
        setEmailAddresses(localEmailAddresses);
        onSubmit(localEmailAddresses);
        onClose();
    };

    return isOpen ? (
        <ModalBackground>
            <ModalContainer>
                <div className='flex flex-col p-12 text-center w-full'>
                <div className='text-2xl font-extrabold py-5 w-80'>Split Expense</div>
                <input
                    type="number"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(e.target.value)}
                    placeholder="Number of People"
                    className='flex text-center'
                />
                <div className='flex flex-col p-2'>
                {Array.from({ length: peopleCount }, (_, index) => (
                    <input
                        key={index}
                        type="email"
                        value={localEmailAddresses[index] || ''}
                        onChange={(e) => handleEmailChange(index, e.target.value)}
                        placeholder={`Email ${index + 1}`}
                        className='flex text-center py-3'
                    />
                ))}
                </div>
                <div className='flex flex-row pt-5 text-center justify-center gap-x-12'>
                <Button onClick={handleSubmit} className="mx-2" name="Submit" bPad=".8rem 1.6rem" bRad="30px" bg="var(--color-accent)" color="#fff">
                    Submit
                </Button>
                <Button onClick={onClose} name="Cancel" bPad=".8rem 1.6rem" bRad="30px" bg="var(--color-accent)" color="#fff">
                    Cancel
                </Button>
                </div>
                </div>
            </ModalContainer>
        </ModalBackground>
    ) : null;
    
}

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export default SplitExpenseModal;