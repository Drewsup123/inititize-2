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
                setValue(edits)
            }).catch(err => {
                alert("There Was an error updating your board");
            })
            setEditMode(false);
        }

        const handleDelete = () => {
            firebase.database().ref(`/boardData/${boardId}/${subBoardId}/tasks`).child(value.id).remove();
        }

        const setColor = string => {
            const styles = {
            inprogress : {backgroundColor : "yellow"},
            done : {backgroundColor : "green"},
            notstarted : {backgroundColor : "red"},
            needswork : {backgroundColor : "green"},
            critical : {backgroundColor : "red"},
            important : {backgroundColor : "yellow"},
            low : {backgroundColor : "green"},
            }
            const s = string.toLowerCase().replace(' ','');
            console.log(s, styles[s])
            return styles[s]
        }

        return(
            <React.Fragment>
                <TableRow style={editMode ? {width : "100%", borderLeft:"1px solid blue"} : {width : "100%"}}>
                    <TableCell><DragHandle/></TableCell>

                    <TableCell component="th" scope="row">
                        {editMode 
                        ? <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            name="title"
                            type="text"
                            value={edits.title || ""}
                            onChange={handleChange}
                            /> 
                        : Value.title || ""
                        }
                    </TableCell>

                    <TableCell style={setColor(Value.priority)}>
                        {editMode 
                        ? <Select 
                            onChange={handleChange} 
                            value={edits.priority || ""} 
                            name="priority"  
                            open={prioritySelectOpen}
                            onOpen={() => handleSelectState("priority")}
                            onClose={() => handleSelectState("priority")}
                        >
                            <MenuItem value="critical">Critical</MenuItem>
                            <MenuItem value="important">Important</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="very low">Very Low</MenuItem>
                        </Select>
                        : Value.priority || ""
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
                            value={edits.user || ""}
                            onChange={handleChange}
                            /> 
                        : Value.user || ""
                        }
                    </TableCell>

                    <TableCell style={setColor(Value.status)} >
                        {editMode 
                        ? <Select 
                            onChange={handleChange} 
                            value={edits.status || ""} 
                            name="status"  
                            open={statusSelectOpen}
                            onOpen={() => handleSelectState("status")}
                            onClose={() => handleSelectState("status")}
                        >
                            <MenuItem value="Done">Done</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Needs Work">Needs Work</MenuItem>
                            <MenuItem value="Not Started">Not Started</MenuItem>
                        </Select> 
                        : Value.status || ""
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
                            value={edits.description || ""}
                            onChange={handleChange}
                            /> 
                        : Value.description || ""
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
                            value={edits.notes || ""}
                            onChange={handleChange}
                            /> 
                        : 
                        Value.notes || ""
                        }
                    </TableCell>

                    <TableCell>
                        {editMode 
                            ?<CancelIcon onClick={() => setEditMode(false)}/>
                            :<DeleteIcon onClick={()=> handleDelete()}/>
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