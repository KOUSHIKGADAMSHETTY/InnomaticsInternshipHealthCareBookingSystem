const Alert = ({ type, message }) => {
    return (
      <div
        className={`p-4 mb-4 text-white ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        } rounded`}
      >
        {message}
      </div>
    );
  };
  
  export default Alert;