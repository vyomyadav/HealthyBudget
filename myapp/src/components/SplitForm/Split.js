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
                <h2>Split Expense</h2>
                <input
                    type="number"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(e.target.value)}
                    placeholder="Number of People"
                />
                {Array.from({ length: peopleCount }, (_, index) => (
                    <input
                        key={index}
                        type="email"
                        value={localEmailAddresses[index] || ''}
                        onChange={(e) => handleEmailChange(index, e.target.value)}
                        placeholder={`Email ${index + 1}`}
                    />
                ))}
                <Button onClick={handleSubmit} name="Submit" bPad=".8rem 1.6rem" bRad="30px" bg="var(--color-accent)" color="#fff">
                    Submit
                </Button>
                <Button onClick={onClose} name="Cancel" bPad=".8rem 1.6rem" bRad="30px" bg="var(--color-accent)" color="#fff">
                    Cancel
                </Button>
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