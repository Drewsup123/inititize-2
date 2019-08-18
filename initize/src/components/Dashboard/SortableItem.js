import React from 'react';
import {sortableElement, sortableHandle} from 'react-sortable-hoc';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import * as firebase from "firebase";

const DragHandle = sortableHandle(() => <span style={{cursor : "row-resize"}}>:::</span>);

const SortableItem = sortableElement(({value, index, boardId, subBoardId}) => {
        const [editMode, setEditMode] = React.useState(false);
        const [Value, setValue] = React.useState(value)
        const [edits, setEdits] = React.useState(value);
        const [prioritySelectOpen, setPrioritySelectOpen] = React.useState(false);
        const [statusSelectOpen, setStatusSelectOpen] = React.useState(false);

        const handleSelectState = select => {
            if(select === "priority"){
                setPrioritySelectOpen(!prioritySelectOpen)
            }
            if(select === "status"){
                setStatusSelectOpen(!statusSelectOpen)
            }
        }

        const handleChange = e => {
            setEdits({...edits, [e.target.name] : e.target.value})
        }

        const onSubmitEdits = e => {
            firebase.database().ref(`/boardData/${boardId}/${subBoardId}/tasks`).child(value.id).update(edits).then(() => {
                let copy = {...value};
                let final = {...copy, edits}
                setValue(final)
            }).catch(err => {
                alert("There Was an error updating your board");
            })
            setEditMode(false);
        }

        return(
            <React.Fragment>
                <TableRow style={editMode ? {width : "100%", border:"1px solid blue"} : {width : "100%"}}>
                    <TableCell><DragHandle/></TableCell>

                    <TableCell component="th" scope="row">
                        {editMode 
                        ? <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            name="title"
                            type="text"
                            fullWidth
                            value={edits.title}
                            onChange={(e) => {setEdits({[e.target.name] : e.target.value})}}
                            /> 
                        : Value.title
                        }
                    </TableCell>

                    <TableCell>
                        {editMode 
                        ? <Select 
                            onChange={handleChange} 
                            value={edits.priority} 
                            name="priority" 
                            fullWidth 
                            open={prioritySelectOpen}
                            onOpen={() => handleSelectState("priority")}
                            onClose={() => handleSelectState("priority")}
                        >
                            <MenuItem value="critical">Critical</MenuItem>
                            <MenuItem value="important">Important</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="very low">Very Low</MenuItem>
                        </Select>
                        : Value.priority
                        }
                    </TableCell>

                    <TableCell>
                        {editMode 
                        ? <TextField
                            autoFocus
                            margin="dense"
                            id="user"
                            name="user"
                            type="text"
                            fullWidth
                            value={edits.user}
                            onChange={(e) => {setEdits({[e.target.name] : e.target.value})}}
                            /> 
                        : Value.user
                        }
                    </TableCell>

                    <TableCell>
                        {editMode 
                        ? <Select 
                            onChange={handleChange} 
                            value={edits.status} 
                            name="status" 
                            fullWidth 
                            open={statusSelectOpen}
                            onOpen={() => handleSelectState("status")}
                            onClose={() => handleSelectState("status")}
                        >
                            <MenuItem value="Done">Done</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Needs Work">Needs Work</MenuItem>
                            <MenuItem value="Not Started">Not Started</MenuItem>
                        </Select> 
                        : Value.status
                        }
                    </TableCell>

                    <TableCell>
                        {editMode 
                        ? <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            name="description"
                            type="text"
                            fullWidth
                            value={edits.description}
                            onChange={(e) => {setEdits({[e.target.name] : e.target.value})}}
                            /> 
                        : Value.description
                        }
                    </TableCell>

                    <TableCell>
                    {editMode 
                        ? <TextField
                            autoFocus
                            margin="dense"
                            id="notes"
                            name="notes"
                            type="text"
                            fullWidth
                            value={edits.notes}
                            onChange={(e) => {setEdits({[e.target.name] : e.target.value})}}
                            /> 
                        : 
                        Value.notes
                        }
                    </TableCell>

                    <TableCell>
                        {editMode 
                            ?<CancelIcon onClick={() => setEditMode(false)}/>
                            :<DeleteIcon />
                        }
                        {editMode 
                            ? <SaveIcon onClick={() => onSubmitEdits()}/> 
                            : <EditIcon 
                                onClick={() => setEditMode(!editMode)}
                            />
                        }
                    </TableCell>
                </TableRow>
            </React.Fragment>
        )
    }
)

export default SortableItem;