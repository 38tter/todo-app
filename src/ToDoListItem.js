import React, { Component } from "react";
import styled from "styled-components";
import { Checkbox } from 'pretty-checkbox-react';

class ToDoListItem extends Component {

    toggleCheck(event) {
        var checked = event.target.checked;
        console.log(this.props.id);
        console.log(checked);
        this.props.onTodoCheck(this.props.id, checked);
    };

    render(){
        const {
            description,
            check,
        } = this.props;

        const Todolist = styled.div`
            padding: 12px;
            background-color: aquamarine;
            text-align: center;
            width: 30%;
            margin: auto;
            box-shadow: 0 0 7px #1abc9c;
        `;

        const ToDoListItemDescription = styled.div`
            word-wrap: break-word;
            padding: 8px;

        `

        return(
            <div style={{margin: '20px'}}>
            <Todolist>
                <div className="toDoListItemChild">
                    <ToDoListItemDescription>{description}</ToDoListItemDescription>
                </div>
                <div>
                    <Checkbox 
                        checked={check}
                        onChange={this.toggleCheck.bind(this)}
                        style={{float: 'left'}}
                    ></Checkbox>
                </div>
            </Todolist>
            </div>
        )
    }
}

export default ToDoListItem;