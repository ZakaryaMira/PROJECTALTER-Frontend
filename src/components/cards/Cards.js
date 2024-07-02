import './Cards.css'

const Cards = (prop) => {
  return (
    <div className='services-box-one'>
            <h1 className='service-info-heading'>{prop.title}</h1>
            <img className ="services-images" src={prop.image}/>
    </div>
  )
}

export default Cards