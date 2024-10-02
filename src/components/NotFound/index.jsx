import "./styles.scss";

function NotFound ({message, description}) {
    return (
        <div className="notFound">
            <div><h1>x.x</h1></div>
            <div><h2>{message}</h2></div>
            <div><p>{description}</p></div>
        </div>
    )
}

export default NotFound;