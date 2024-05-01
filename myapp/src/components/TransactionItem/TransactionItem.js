import emailjs from '@emailjs/browser';
import React, { useState } from "react";
import styled from "styled-components";
import {
    bitcoin, book, calender, card, circle, clothing, comment, dollar,
    food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt
} from "../../utils/Icons";
import { dateFormat } from "../../utils/dateFormat";
import Button from "../Button/Button";
import SplitExpenseModal from "../SplitForm/Split";

function TransactionItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [peopleCount, setPeopleCount] = useState(1);
    const [emailAddresses, setEmailAddresses] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const useSendEmails = (emailAddresses, splitAmount, description) => {
        emailAddresses.forEach((emailAddress) => {
            const templateParams = {
                to_email: emailAddress,
                split_amount: splitAmount.toFixed(2),
                from_name: 'Healthy Budget',
                message: `Hello! Just a reminder that you owe $${splitAmount.toFixed(2)} as your share of the expense for ${description}. Please let us know if you have any questions or require further details. Thank you for settling this at your earliest convenience!`
            };
    
            emailjs.send('service_ygjkefo', 'template_ezly57f', templateParams, '3Dgn99r0A5F3nCRXF')
                .then((response) => {
                    console.log('Email successfully sent to:', emailAddress, response.text);
                }, (error) => {
                    console.log('Failed to send email to:', emailAddress, error.text);
                });
        });
    };

    const useHandleSplitExpense = (emailAddresses) => {
        const splitAmount = amount / peopleCount;
        const sendDescription = description ? `(${description})` : '';
        useSendEmails(emailAddresses, splitAmount, sendDescription);
        closeModal();
    };


    // Dynamically determine the icon based on type and category
    const categoryIcon = () => {
        if (type === 'income') {
            switch(category) {
                case 'salary': return money;
                case 'freelancing': return freelance;
                case 'investments': return stocks;
                case 'stocks': return users;
                case 'bitcoin': return bitcoin;
                case 'bank': return card;
                case 'youtube': return yt;
                case 'other': return piggy;
                default: return '';
            }
        } else {  // type === 'expense'
            switch(category) {
                case 'education': return book;
                case 'groceries': return food;
                case 'health': return medical;
                case 'subscriptions': return tv;
                case 'takeaways': return takeaway;
                case 'clothing': return clothing;
                case 'travelling': return freelance;  // May need a specific icon for travelling
                case 'other': return circle;
                default: return '';
            }
        }
    }

    return (
        <TransactionItemStyled indicator={indicatorColor}>
            <div className="icon">
                {categoryIcon()}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{dollar} {amount}</p>
                        <p>{calender} {dateFormat(date)}</p>
                        <p>
                            {comment}
                            {description}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Button 
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color)'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                    <div className="btn-con">
                        <Button 
                            name={'Split'}
                            bPad={'.8rem 1.6rem'}
                            bRad={'30px'}
                            bg={'var(--color-accent)'}
                            color={'#fff'}
                            onClick={openModal}
                        >
                            Split Expense
                        </Button>
                    </div>
                </div>
            </div>
            <SplitExpenseModal 
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            peopleCount={peopleCount}
                            setPeopleCount={setPeopleCount}
                            onSubmit={useHandleSplitExpense}
                            setEmailAddresses={setEmailAddresses}
            /> 

        </TransactionItemStyled>
    )
}


const TransactionItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;


export default TransactionItem;