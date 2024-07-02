import './hero.css'
import MainPhoto from '../../SVG/undraw_to_the_moon_re_q21i.svg'
const Skills = () => {
  return (
    <div className='section-one'>
        <div className='main-info'>
            <h1 className='main-heading'>share your services, and find<br/>people who have a skill you<br/>need</h1>
            <h3 className='secondary-heading'>unlock Your Potential, Swap Skills<br/> and Elevate Expertise!</h3>
            <button className='main-button hover-effect'>Start now</button>
            </div>
        <div className='video-box'>
          <img className='img-video' src={MainPhoto} alt=""/>
          <div className='blurCircle'></div>
          </div>
    </div>
  )
}
export default Skills