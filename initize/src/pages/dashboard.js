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

const DragHandle = sortableHandle(() => <span style={{cursor : "row-resize"}}>:::</span>);

const SortableContainer2 = sortableContainer(({children}) => {
    return(
            <TableBody style={{width : "100%"}}>
                {children}
            </TableBody>
    )
})

const SortableItem2 = sortableElement(({value}) =>
        <React.Fragment>
            <TableRow style={{width : "100%"}}>
                <TableCell><DragHandle/></TableCell>
                <TableCell component="th" scope="row">
                    {value.title}
                </TableCell>
                <TableCell>{value.priority}</TableCell>
                <TableCell>{value.user}</TableCell>
                <TableCell>{value.status}</TableCell>
                <TableCell>{value.description}</TableCell>
                <TableCell>{value.notes}</TableCell>
                <TableCell><DeleteIcon /></TableCell>
            </TableRow>
        </React.Fragment>
)

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
        }
    }

    componentDidMount(){
        // alert("mounted");
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({temp_Array}) => ({
            temp_Array: arrayMove(temp_Array, oldIndex, newIndex),
        }));
    };

    onSortEnd2 = ({oldIndex, newIndex}) => {
        this.setState(({tempRows}) => ({
            tempRows: arrayMove(tempRows, oldIndex, newIndex),
        }));
    };

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

    handleChange = e => {

    }

    render(){
        const {temp_Array, tempRows} = this.state;
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
                                    <TableCell><AddIcon style={{cursor : "pointer"}} onClick={this.handleOpen}/></TableCell>
                                </TableRow>
                            </TableHead>

                            <SortableContainer2 onSortEnd={this.onSortEnd2} useDragHandle lockAxis="y" lockToContainerEdges={true}>
                                {tempRows.map((value, index) => <SortableItem2 key={index} index={index} value={value}/>)}
                            </SortableContainer2>
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
                        />
                        {/* Priority */}
                        <Select name="priority" fullWidth open={this.state.selectOpen}>
                            <MenuItem>Critical</MenuItem>
                            <MenuItem>Important</MenuItem>
                            <MenuItem>Low</MenuItem>
                            <MenuItem>Very Low</MenuItem>
                        </Select>
                        {/* Users */}
                        <Select name="user" fullWidth open={this.state.selectOpen}>
                            <MenuItem>Critical</MenuItem>
                            <MenuItem>Important</MenuItem>
                            <MenuItem>Low</MenuItem>
                            <MenuItem>Very Low</MenuItem>
                        </Select>
                        {/* Status */}
                        <Select name="status" fullWidth open={this.state.selectOpen}>
                            <MenuItem>Done</MenuItem>
                            <MenuItem>In Progress</MenuItem>
                            <MenuItem>Needs Work</MenuItem>
                            <MenuItem>Not Started</MenuItem>
                        </Select>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Description"
                            name="description"
                            type="text"
                            fullWidth
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Notes"
                            name="title"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                    <Button color="primary" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button color="primary">
                        Create
                    </Button>
                    </DialogActions>
                </Dialog>


            </React.Fragment>
        );
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