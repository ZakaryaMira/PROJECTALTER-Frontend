import './showcase.css'
import MySvg from '../../SVG/undraw_educator_re_ju47.svg' 
import { Infobox } from '../../components'
const showcase = () => {
  return (
    <div className='section-Two'>
      <h1 class="showcase-heading-one">A place to exchange<br/>knowledge</h1>
      <img className ="img-section-two" src={MySvg} alt="Your SVG"/>
      <h1 className='showcase-heading-one'>Unleash Your Mastery<br/>through yourSkill<br/>Symphony</h1>
    </div>
  )
}

export default showcase