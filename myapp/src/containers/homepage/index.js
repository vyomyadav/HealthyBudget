import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Budgets from '../../components/Budgets/budget';
import Dashboard from '../../components/Dashboard/Dashboard';
import Expenses from '../../components/Expenses/Expenses';
import Incomes from '../../components/Incomes/Incomes';
import Navigation from '../../components/Navigation/Navigation';
import Orb from '../../components/Orb/Orb';
import { useGlobalContext } from '../../components/context/globalContext';
import { MainLayout } from '../../styles/Layouts';
import TransactionPage from '../transaction';
import Profile from '../../components/Profile';

const backgroundUrl = '/background.png';

function Homepage() {


  const global = useGlobalContext();
  const [active, setActive] = useState(1);
  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])

  const displayData = () => {
    switch(active) {
      case 1:
        return <Dashboard setActive={setActive}/> 
      case 2:
        return <TransactionPage />
      case 3:
        return <Incomes />
      case 4:
        return <Expenses />
      case 5:
        return <Budgets /> 
      case 6: 
        return <Profile />
      default: 
        return <Dashboard setActive={setActive}/>
    }
  }

  return (

    <AppStyled bg={backgroundUrl} className='HomePage'>
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive}/>
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
    
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;


export default Homepage;
