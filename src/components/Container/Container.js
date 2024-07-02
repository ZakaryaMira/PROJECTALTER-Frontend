import './Container.css'
const Container = (props) => {
  return (
    <div className=" mx-auto d-flex justify-content-center containerParent coloredBackground">
      {props.children}
    </div>
  )
}

export default Container