import './Service.css'
import { Cards, Minicards } from '../../components/index'
import SVGEXCHANGE from '../../SVG/undraw_share_link_re_54rx.svg'
import SVGREQUEST from '../../SVG/undraw_accept_request_re_d81h.svg'
import SVGLIST from '../../SVG/undraw_collaboration_re_vyau.svg'
import SVGROFFER from '../../SVG/undraw_vault_re_s4my.svg'



const Service = () => {
  return (
    <div className='services'>
        <h1 className='catalog'>Service Catalog</h1>
        <Cards title= "Create listining for skill you can offer" image={SVGLIST}/>
        <div className='services-box-two'>
        <Minicards title= "Make skill exchange" image={SVGEXCHANGE} width="48%" height="17rem"/>
        <Minicards title= "make skill requests" image={SVGREQUEST} width="48%" height="17rem"/>
        </div>
        <Cards title="make offers to skill requests" image={SVGROFFER}/>
        

    </div>
  )
}

export default Service