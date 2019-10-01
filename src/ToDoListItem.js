import React, { Component } from "react";
import './ToDoListItem.css';
import styled from "styled-components";

class ToDoListItem extends Component {

    toggleCheck(event) {
        var checked = event.target.checked;
        console.log(this.props.id);
        console.log(checked);
        this.props.onTodoCheck(this.props.id, checked);
    };

    render(){
        const {
            title,
            description,
            check,
        } = this.props;

        const Button = styled.div`
            padding: 12px;
            background-color: #7fffd4;
            text-align: center;
            width: 300px;
            border: 1px solid;
            border-radius: 4px;
            margin: 5px;
            box-shadow: 0 0 7px #1abc9c;
        `;

        return(
            <Button>
                <div className="toDoListItem">
                    <div className="toDoListItem-title">タイトル：{title}</div>
                    <div className="toDoListItem-description">内容：{description}</div>
                </div>
                <input
                    type="checkbox"
                    name="check"
                    checked={check}
                    onChange={this.toggleCheck.bind(this)}
                />
            </Button>
        )
    }
}

export default ToDoListItem;