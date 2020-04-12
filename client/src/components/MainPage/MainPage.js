import React, { useState, useEffect } from 'react';
import Column from '../Column/Column';
import ColumnTitle from '../ColumTitle/ColumnTitle';

function MainPage(props) {
    const [user, setUser] = useState({ dashboards: [{ columns: [] }] });
    const [loop, setLoop] = useState(0);
    const columnStyle = {
        backgroundColor: '#555',
        width: '250px',
        // height: '400px',
        margin: '32px',
    };
    function addColumn() {
        const newColumn = {
            name: '',
            columnid: user.dashboards[0].columns.length + 1,
            cards: [],
            //     {
            //         title: 'Card1',
            //         cardid: Math.random(),
            //         duedate: '',
            //         lables: ['Important', 'Medium', 'Low'],
            //         description: 'some text',
            //         asignee: ['', ''],
            //     },
            // ],
        };
        // columns.push(newColumn);
        user.dashboards[0].columns.push(newColumn);
        setUser({ ...user });
        updateUserProfile(user);
    }
    function deleteColumn(colIndex) {
        console.log('function deleteColumn called', colIndex);
        user.dashboards[0].columns.splice(colIndex, 1);
        setUser({ ...user });
        updateUserProfile(user);
    }
    function addCard(columnIndex) {
        const newCard = {
            title: '',
            cardid: Math.random(),
            duedate: '',
            lables: ['Important', 'Medium', 'Low'],
            description: '',
            asignee: [''],
        };
        user.dashboards[0].columns[columnIndex].cards.push(newCard);
        setUser({ ...user });
        updateUserProfile(user);
    }

    function saveCard(cardid, colIndex, cardIndex) {
        console.log('function saveCard called', cardid, colIndex, cardIndex);
        let title = document.getElementById('title' + cardid);
        console.log('logging card title', title.value);
        let description = document.getElementById('desc' + cardid);
        console.log('logging card description', description.value);
        let date = document.getElementById('date' + cardid);
        console.log('logging card date', date.value);
        console.log(title.value, description.value, date.value);
        const updatedCard = {
            title: title.value,
            cardid: cardid,
            duedate: date.value,
            lables: ['Important', 'Medium', 'Low'],
            description: description.value,
            asignee: [''],
        };
        user.dashboards[0].columns[colIndex].cards[cardIndex] = updatedCard;
        setUser({ ...user });
        updateUserProfile(user);
    }

    function deleteCard(columnIndex, cardIndex) {
        console.log('function deleteCard called!', columnIndex, cardIndex);
        user.dashboards[0].columns[columnIndex].cards.splice(cardIndex, 1);
        setUser({ ...user });
        updateUserProfile(user);
    }
    function updateColumnTitle(index, title) {
        console.log('function updateColumnTitle called', index, title);
        user.dashboards[0].columns[index].name = title;
        setUser({ ...user });
        updateUserProfile(user);
    }

    async function updateUserProfile(user) {
        const url = '/api/updateUserProfile';
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json());
        console.log(result);
    }

    async function getUser(email = 'user@user.com') {
        const url = `/api/getUser/${email}`;
        const result = await fetch(url).then((response) => response.json());
        const user = result[0];
        // console.log(user.dashboards[0].columns);
        // setColumns([...user.dashboards[0].columns]);
        setUser({ ...user });
    }

    useEffect(function () {
        getUser();
    }, []);
    const mainPageStyle = {
        width: '80%',
        padding: '32px',
        display: 'flex',
        justifyContent: 'center',
    };
    return (
        <div id={props.id} style={mainPageStyle}>
            {user.dashboards[0].columns.map((element, index) => {
                return (
                    <Column
                        id={Math.random().toString()}
                        style={columnStyle}
                        cards={element.cards}
                        colName={element.name}
                        colid={element.columnid}
                        addCard={addCard}
                        deleteCard={deleteCard}
                        colIndex={index}
                        deleteColumn={deleteColumn}
                        saveCard={saveCard}
                        colTitle={
                            <ColumnTitle
                                title={element.name}
                                index={index}
                                updateColumnTitle={updateColumnTitle}
                            />
                        }
                    />
                );
            })}

            <div style={{ margin: '32px' }}>
                <button onClick={addColumn}>Add column</button>
            </div>
        </div>
    );
}

export default MainPage;
