import './Uploadpic.css'

import UPLOADPIC from '../../SVG/undraw_pic_profile_re_7g2h.svg'

const Uploadpic = ({heading}) => {
  return (
    <div className='form-row'>
        <h1 className='form-heading-two'>{heading}</h1>
        <img className='upload-image' src ={UPLOADPIC} alt="Upload profile"/>
    </div>
  )
}

export default Uploadpic