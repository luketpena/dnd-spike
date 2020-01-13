const initialData = {
  tasks: {
    'task-1': {id: 'task-1', content: 'Tie my shoe'},
    'task-2': {id: 'task-2', content: 'Shut the door'},
    'task-3': {id: 'task-3', content: 'Pick up sticks'},
    'task-4': {id: 'task-4', content: 'Lay them straight'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1','task-2','task-3','task-4'],
    },
  },
  //For reordering columns
  columnsOrder: ['column-1']
};

export default initialData;