import React from 'react';
import './App.css';
import initialData from './initial-data';
import '@atlaskit/css-reset';

import Column from './Column';

import {DragDropContext} from 'react-beautiful-dnd';

class App extends React.Component {

  state = initialData;

  renderDndColumns = ()=> {
    return this.state.columnsOrder.map( columnId=> {
      const column = this.state.columns[columnId];
      const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
      
      return <Column key={column.id} column={column} tasks={tasks}/>
    })
  }

  onDragEnd = (result)=> {
    const {destination, source, draggableId} = result;

    //If not dropped in a viable place, exit function and do nothing
    if (!destination) { return; }

    //If dropped in the same place it was before, exit function and do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) { return; }

    //Reorder array
    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);

    //Remove item from original place and splice into new home
    newTaskIds.splice(source.index,1);
    newTaskIds.splice(destination.index, 0, draggableId);

    //Recreate the target column, but with new taskIds
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    //Generate a new state for our app and set it
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      }
    };
    this.setState(newState);
  }

  render() {
    return (
      <div className="App">
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.renderDndColumns()}
        </DragDropContext>
      </div>
    );
  }
}

export default App;
