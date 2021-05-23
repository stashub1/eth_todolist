import React, {Component} from 'react';


class TodoList extends Component {



    render() {
        return (
            <div className="App">
                <div id="content">
                    <br/>
                    <br/>
                    <br/>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        this.props.createTask(this.task.value);
                    }}>
                        <input id="newTask" ref={(input) => this.task  = input}type="text" className="form-control" placeholder="Task description.."/>
                        <input type="submit" hidden="true" value="Submit"/>
                    </form>
                    <ul id="taskList" className="list-unstyled">
                        {this.props.tasks.map((task,key) => {
                            return(
                                <div className="taskTemplate" className="checkbox" key={key}>
                                    <form>
                                        <input
                                            type="checkbox"
                                            name={task.id}
                                            defaultChecked={task.completed}
                                            ref={(input) => {
                                                this.checkbox = input;
                                            }}
                                            onClick={
                                            (event) => {
                                                this.props.toggleCompleted(this.checkbox.name)
                                            }}/>
                                        <span className="content">{task.content}</span>
                                    </form>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}



export default TodoList;
