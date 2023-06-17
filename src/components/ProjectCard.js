import { Col } from "react-bootstrap";


export const ProjectCard = ({ title, description, imgUrl,checkout }) => {

  return (
    <Col size={12} sm={6} md={6}>
      <div className="proj-imgbx">
        <img src={imgUrl} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <h5 >{description}</h5><br />
        <div style={{}}><a href={checkout} target="_blank" id="projectcardbutton" style={{ border:'1px solid white',borderRadius:'9px',color:'white',backgroundColor:'#885fd0',paddingLeft:'8px',paddingRight:'8px',paddingTop:'5px',paddingBottom:'5px'}}>Check Out</a>
        </div>
        </div>
      </div>
    </Col>
  )
}
