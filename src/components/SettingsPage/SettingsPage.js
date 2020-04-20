import React from 'react';
//import './components-style.css';

function SettingsPage(){
  return (
    <>[SETTINGS PAGE]
    <div id="accordion">
        <div class="card">
          <div class="card-utility-header">Card Utility Header</div>

          <div class="card-header" id="headingOne">
            Card Header
            <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              Collapsible Group Item #1
            </button>
          </div>
          
          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
              Card Body
            </div>

          </div>
            
        </div>
      </div>
    
    </>
  )
} 

export default SettingsPage;