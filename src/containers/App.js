import React from 'react';
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox'
import './App.css';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../ErrorBoundry'

class App extends React.Component{
    constructor(){
        super()
        this.state={
            robots: [],
            searchfield:''
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(response=>response.json())
        .then(users=> this.setState({robots:users}))
    }
    onSearchChange=(event)=>{
        this.setState({searchfield:event.target.value})
        
        
    }
    render(){
        const {robots,searchfield}=this.state;
        const filteredRobots=robots.filter(robots=>{
            return robots.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return (robots.length===0)? //used ternary operator
            <h1>Loading</h1>:
         (
            <div className="tc">
                <h1 className='f1'>Robofriends</h1>
                <Searchbox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );   
    }
}

export default App;