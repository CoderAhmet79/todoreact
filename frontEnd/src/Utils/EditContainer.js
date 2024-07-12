
const EditContainer = (props) => {
  const as=props.dateInfo
  console.log( as)
  return (
    <div className="editContainer">
    <div className="closeIcon"><img src="img/close_icon.png" style={{float: "right", opacity: 1}} alt='ToDo'/> </div>
    <div >Data: {as} </div>
</div>
  )
}

export default EditContainer
