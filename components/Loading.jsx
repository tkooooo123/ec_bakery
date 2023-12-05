import ReactLoading from'react-loading';
import propTypes from 'prop-types'

function Loading({ isLoading }) {
    return (
        <>
        {isLoading && (
          <div style={{
            position:'fixed',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            backgroundColor: '#fff',
            zIndex: '10000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: '0.9',
            }}> 
          <ReactLoading type="bars" color="black" height={60} width={100}/>
          </div>
        )}
        </>
    )

}
export default Loading;
Loading.propTypes = {
  isLoading: propTypes.bool.isRequired,
}