pragma solidity >0.4.0 < 0.7.0;


contract TodoList {

    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    event TaskCreated(uint id, string content, bool completed);
    event TaskCompleted(uint id, bool completed);

    mapping(uint => Task) public tasks;

    constructor() public {
        string memory descr = "do some work1";
        createTask(descr);
    }

    function getSomething() public returns(uint) {
        return 3;
    }

    function createTask(string memory _content) public{
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);

    }

    function toggleCompleted(uint _id) public {
        Task memory storedTask = tasks[_id];
        storedTask.completed = true;
        tasks[_id] = storedTask;
        emit TaskCompleted(_id, true);
    }


}