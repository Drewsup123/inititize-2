import React from 'react';
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as firebase from 'firebase';
import SortableItem from '../components/Dashboard/SortableItem';

const DragHandle = sortableHandle(() => <span style={{cursor : "row-resize"}}>:::</span>);

const SortableContainer = sortableContainer(({children}) => {
    return(
            <TableBody style={{width : "100%"}}>
                {children}
            </TableBody>
    )
})

class Dashboard extends React.Component{
    constructor(){
        super();
        this.state = {
            open : false,
            selectOpen : false,
            prioritySelectOpen : false,
            userSelectOpen : false,
            statusSelectOpen : false,
            tempRows : [
                {
                    title : "test",
                    priority : "critical_1",
                    user : "Drew Johnson",
                    status : "done",
                    description : "test description 1",
                    notes : "this is a note 1"
                },
                {
                    title : "test2",
                    priority : "critical_2",
                    user : "Drew Johnson",
                    status : "done",
                    description : "test description 2",
                    notes : "this is a note 2"
                },
                {
                    title : "test3",
                    priority : "critical_3",
                    user : "Drew Johnson",
                    status : "done",
                    description : "test description 3",
                    notes : "this is a note 3"
                },
                {
                    title : "test4",
                    priority : "critical_4",
                    user : "Drew Johnson",
                    status : "done",
                    description : "test description 4",
                    notes : "this is a note 4"
                },
            ],
            newTask : {},
            tasks : [],
        }
    }

    componentDidMount(){
        // alert("mounted");
        if(this.props.match.params.subBoardId != undefined){
            // console.log("param name", this.props.match.params.subBoardId);
            // firebase.database().ref(`/boardData/${this.props.selectedBoard.id}/${this.props.match.params.subBoardId}`).once('value').then(snap => {
            //     if(snap.val() && snap.val().tasks){
            //         this.setState({tasks : Object.values(snap.val().tasks)})
            //         console.log("tasks ", Object.values(snap.val().tasks))
            //     }
            // })
            this.newTaskListener();
            this.deleteTaskListener();
            console.log("state", this.state)
        }
    }

    componentDidUpdate(){
        console.log("Tasks in State", this.state.tasks)
    }

    newTaskListener = () => {
        let newTasks = [];
        firebase.database().ref(`/boardData/${this.props.selectedBoard.id}/${this.props.match.params.subBoardId}`).child("tasks")
            .on('child_added', snap => {
                newTasks.push(snap.val());
                this.setState({tasks : newTasks})
        })
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        console.log("old index", oldIndex, "newIndex", newIndex)
        let copy = [...this.state.tasks];
        copy = arrayMove(copy, oldIndex, newIndex);
        console.log("what it is returning", copy)
        // this.setState(({tasks}) => ({
        //     tasks: arrayMove(tasks, oldIndex, newIndex),
        // }));
        this.setState({tasks : copy})
        // this.forceUpdate()
    };

    // onSortEnd2 = ({oldIndex, newIndex}) => {
    //     this.setState(({tempRows}) => ({
    //         tempRows: arrayMove(tempRows, oldIndex, newIndex),
    //     }));
    // };

    handleClose = () => {
        this.setState({open : false})
    }

    handleOpen = () => {
        this.setState({open : true})
    }

    handleSelectOpen = select => {
        if(select === "user"){
            this.setState({userSelectOpen : true})
        }
        if(select === "priority"){
            this.setState({prioritySelectOpen : true})
        }
        if(select === "status"){
            this.setState({statusSelectOpen : true})
        }
    }

    handleSelectClose = select => {
        if(select === "user"){
            this.setState({userSelectOpen : false})
        }
        if(select === "priority"){
            this.setState({prioritySelectOpen : false})
        }
        if(select === "status"){
            this.setState({statusSelectOpen : false})
        }
    }

    handleChange = e => {
        this.setState({newTask : {...this.state.newTask, [e.target.name] : e.target.value}});
        console.log(this.state.newTask);
    }

    handleAddNewTask = () => {
        // console.log(this.props.selectedBoard.id)
        const boardId = this.props.selectedBoard.id;
        const subBoardId = this.props.match.params.subBoardId;
        const ref = firebase.database().ref(`/boardData/${boardId}/${subBoardId}`).child("tasks");
        const key = ref.push().key;
        const task = {...this.state.newTask, id : key}
        ref.child(key).set(task).then(() => {
            this.setState({open:false});
            // this.setState({tasks : [...this.state.tasks, task]})
        })
        .catch(err => console.log(err))
    }

    deleteTaskListener = () => {
        firebase.database().ref(`/boardData/${this.props.selectedBoard.id}/${this.props.match.params.subBoardId}`).child("tasks").on("child_removed", snap => {
            console.log("Delete Listener", snap.val())
            let final = [];
            this.state.tasks.map(task => {
                if(snap.val().id !== task.id){
                    final.push(task)
                }
            })
            this.setState({tasks : final})
        })
    }

    render(){
        if(this.props.selectedBoard && this.props.match.params.subBoardId){
            return(
                <React.Fragment>
                    <div className="dashboard">
                        <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Task</TableCell>
                                        <TableCell>Priority</TableCell>
                                        <TableCell>User</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Notes</TableCell>
                                        <TableCell>
                                            <AddIcon 
                                                style={{cursor : "pointer"}} 
                                                onClick={this.handleOpen}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
    
                                <SortableContainer onSortEnd={this.onSortEnd} useDragHandle lockAxis="y" lockToContainerEdges={true}>
                                    {
                                        this.state.tasks.length ?
                                        this.state.tasks.map((value, index) => 
                                            <SortableItem 
                                                subBoardId={this.props.match.params.subBoardId} 
                                                boardId={this.props.selectedBoard.id} 
                                                key={value.id} 
                                                index={index}
                                                value={value}
                                                />
                                            )
                                        :null
                                    }
                                </SortableContainer>
                            </Table>
                        </Paper>
                    </div>
    
    
                    {/* modal */}
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create A Task</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Task Title"
                                type="text"
                                name="title"
                                fullWidth
                                onChange={this.handleChange}
                            />
                            {/* Priority */}
                            <Select 
                                onChange={this.handleChange} 
                                value={this.state.newTask.priority} 
                                name="priority" 
                                fullWidth 
                                open={this.state.prioritySelectOpen}
                                onOpen={() => this.handleSelectOpen("priority")}
                                onClose={() => this.handleSelectClose("priority")}
                            >
                                <MenuItem value="critical">Critical</MenuItem>
                                <MenuItem value="important">Important</MenuItem>
                                <MenuItem value="low">Low</MenuItem>
                                <MenuItem value="very low">Very Low</MenuItem>
                            </Select>
                            {/* Users */}
                            <Select 
                                onChange={this.handleChange} 
                                value={this.state.newTask.user} 
                                name="user" 
                                fullWidth 
                                open={this.state.userSelectOpen}
                                onOpen={() => this.handleSelectOpen("user")}
                                onClose={() => this.handleSelectClose("user")}
                            >
                                <MenuItem value="testUser">TestUser</MenuItem>
                            </Select>
                            {/* Status */}
                            <Select 
                                onChange={this.handleChange} 
                                value={this.state.newTask.status} 
                                name="status" 
                                fullWidth 
                                open={this.state.statusSelectOpen}
                                onOpen={() => this.handleSelectOpen("status")}
                                onClose={() => this.handleSelectClose("status")}
                            >
                                <MenuItem value="Done">Done</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Needs Work">Needs Work</MenuItem>
                                <MenuItem value="Not Started">Not Started</MenuItem>
                            </Select>
    
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Description"
                                name="description"
                                type="text"
                                fullWidth
                                onChange={this.handleChange}
                            />
    
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Notes"
                                name="notes"
                                type="text"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </DialogContent>
                        <DialogActions>
                        <Button color="primary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleAddNewTask} color="primary">
                            Create
                        </Button>
                        </DialogActions>
                    </Dialog>
    
    
                </React.Fragment>
            );
        }
        if(this.props.selectedBoard && this.props.match.params.chatroomId){
            return null;
        }
        else{
            return(
                <div>
                    <h1>Please select a sub-board or chatroom to get started</h1>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        user : state.user,
        selectedBoard : state.selectedBoard,
        boards : state.boards
    }
}

export default connect(mapStateToProps)(Dashboard);