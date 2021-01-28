import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; // Para poder navegar de una pagina a otra


import Form from './module/Form';
import List from './module/List';
import Edit from './module/Edit';

function App() {

  return (
    <Router>
      <div className="App">
        
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link class="navbar-brand" href="#" style={{color:'orange',fontWeight:'bold'}}>Finance +</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link class="nav-link" to="/"> Registration list </Link>
              </li>
            </ul>
            <Link class="btn btn-info"  to="/form">Add Operation</Link>
          </div>
        </nav>

        <div class="container py-4">
          <div class="row">

          <Route path="/" exact component={List} />
          <Route path="/form" component={Form} />
          <Route path="/edit/:employeeId" component={Edit} />

          </div>
        </div>

      </div>
    </Router>
  );
}

export default App;
