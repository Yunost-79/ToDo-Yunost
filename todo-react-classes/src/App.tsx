import { Component } from 'react'
import './App.scss'

class App extends Component {
    state = { text: 'Yo class component' }
    render() {
        return <div className="App">{this.state.text}</div>
    }
}

export default App
