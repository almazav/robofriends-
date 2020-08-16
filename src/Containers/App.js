import React, {Component} from 'react';
import CardList from '../Components/CardList';
// import {robots} from './robots';
import SearchBox from '../Components/SearchBox';
import '../Containers/app.css';
import Scroll from '../Components/Scroll';
import ErrorBoundary from '../Components/errorBoudary';


class App extends Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield:''
        }  
    }



    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/users')
            .then(response => response.json()) 
            .then(users => this.setState({robots: users}));      
    }



    onSearchChange = (event) =>{
        this.setState({searchfield: event.target.value})
    }


    render(){
        const {robots, searchfield} = this.state;
        const filteredrobots = robots.filter(robot=>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        if (robots.length === 0) {
            return <h1> Loading </h1>
        } else {
          return(
            <div className = 'tc'>
                <h1 className = 'f1'>RoboFriends</h1>
                <SearchBox searchChange = {this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                   <CardList robots = {filteredrobots}/>
                   </ErrorBoundary>
                </Scroll>
            </div>
        );
    } 
    }
}

export default App;