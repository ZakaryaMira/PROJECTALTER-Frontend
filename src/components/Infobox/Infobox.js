import './Infobox.css'

const Infobox = (prop) => {
  return (
    <div className='info-box info-box-one'><h2 className='box-info'>{prop.title}</h2></div>
  )
}

export default Infobox