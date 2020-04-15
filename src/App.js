import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from './components/Draggable/Draggable';
import Droppable from './components/Droppable/Droppable';
import Card from './components/Card/Card';
import Column from './components/Column/Column';
import MainPage from './components/MainPage/MainPage';
function App() {
    const [cards, addCard] = useState(0);
    const Wrapper = styled.div`
        width: 80%;
        padding: 32px;

        justify-content: center;
    `;

    return (
        <Wrapper>
            <MainPage id="qaz" />
        </Wrapper>
    );
}

export default App;
