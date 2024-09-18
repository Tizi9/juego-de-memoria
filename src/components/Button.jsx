/* eslint-disable react/prop-types */
function Button({ color, onClick, isActive }) {
    return (
      <button 
        className={`colour-button ${isActive ? 'active' : ''}`} 
        onClick={onClick}
        style={{ backgroundColor: color }}
      />
    );
  }

  export default Button;