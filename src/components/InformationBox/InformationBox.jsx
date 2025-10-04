import './InformationBox.css';

const InformationBox = ({ title, content,icon }) => {
    return (
        <div className="information-box">
            {icon}
            <h6>{title}</h6>
            <p>{content}</p>
        </div>
    )
}

export default InformationBox;