export default {
  ONGOING: {
    title: 'Ongoing',
    backgroundColor: 'success/80',
    textColor: 'success-content',
    primaryActionLabel: 'Done',
    primaryActionState: 'DONE',
    secondaryActionLabel: 'Unstart',
    secondaryActionState: 'TODO',
  },
  TODO: {
    title: 'Todo',
    backgroundColor: 'warning/80',
    textColor: 'warning-content',
    primaryActionLabel: 'Start',
    primaryActionState: 'ONGOING',
  },
  DONE: {
    title: 'Done',
    backgroundColor: 'neutral/80',
    textColor: 'neutral-content',
    primaryActionLabel: 'Undo',
    primaryActionState: 'ONGOING',
  },
}
