import React from 'react';
//import './components-style.css';


const testData =  [
  {
    user:
      {
      dashTitle: "Dashboard A",
      columns: [ 
        {
          colTitle: "Column X",
          cards: [ 
            {
              cardTitle: "Card X 1", 
              cardDesc: "This is the description for card X 1", 
              cardDueDate: "April 19/20"
            }, 
            {
              cardTitle: "Card X 2", 
              cardDesc: "This is the description for card X 2", 
              cardDueDate: "April 19/20"
            }, 
            {
              cardTitle: "Card X 1", 
              cardDesc: "This is the description for card X 3", 
              cardDueDate: "April 19/20"
            } ]
        }, 
        {
          colTitle: "Column Y",
          cards: [ 
            {
              cardTitle: "Card Y 1", 
              cardDesc: "This is the description for card Y 1", 
              cardDueDate: "April 19/20"
            }, 
            {
              cardTitle: "Card X 2", 
              cardDesc: "This is the description for card Y 2", 
              cardDueDate: "April 19/20"
            }, 
            {
              cardTitle: "Card X 1", 
              cardDesc: "This is the description for card Y 3", 
              cardDueDate: "April 19/20"
            } ]
        }
      ]
    }
  }
];

function MyTasksPage(){
  return (
    <>
      <div className="mytasks-header">
        My Tasks
      </div>
      
      {/* <h1>{testData[0].user.dashTitle}</h1>
      <h2>{testData[0].user.columns[0].colTitle}</h2>
      <h3>{testData[0].user.columns[0].cards[0].cardTitle}</h3>
      <h3>{testData[0].user.columns[0].cards[0].cardDesc}</h3>
      <h3>{testData[0].user.columns[0].cards[0].cardDueDate}</h3>
      <br></br> */}

      <div className="mytasks-container">
        <div className="mytasks-dash">
          <div className="mytasks-dash-title"><h4>Dashboard A</h4></div>
          <div className="mytasks-column">
            <div className="mytasks-column-title"><h6>Column X</h6></div>
              <div className="mytasks-card">
                  <div className="cardTitle">Card 1</div>
                  <div className="cardDesc">description description description </div>
                  <div className="cardDueDate">April 20/20</div>
              </div>
              <div className="mytasks-card">
                  <div className="cardTitle">Card 2</div>
                  <div className="cardDesc">description description description </div>
                  <div className="cardDueDate">April 21/20</div>
              </div>
          </div>

          <div className="mytasks-column">
            <div className="mytasks-column-title"><h6>Column Y</h6></div>
              <div className="mytasks-card">
                  <div className="cardTitle">Card 1</div>
                  <div className="cardDesc">description description description </div>
                  <div className="cardDueDate">April 20/20</div>
              </div>
              <div className="mytasks-card">
                  <div className="cardTitle">Card 2</div>
                  <div className="cardDesc">description description description </div>
                  <div className="cardDueDate">April 21/20</div>
              </div>
          </div>
        </div>

        <div className="mytasks-dash">
          <div className="mytasks-dash-title"><h4>Dashboard B</h4></div>
          <div className="mytasks-column">
            <div className="mytasks-column-title"><h6>Column Z</h6></div>
              <div className="mytasks-card">
                  <div className="cardTitle">Card 1</div>
                  <div className="cardDesc">description description description </div>
                  <div className="cardDueDate">April 20/20</div>
              </div>
          </div>

         
        </div>
        
      </div>
    
    </>
  )
} 

export default MyTasksPage;