import propTypes from 'prop-types'

function DeleteModal({close, text, handleDelete, id, title}) {
    return (
        <div
          className='modal fade'
          tabIndex='-1'
          id='deleteModal'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header bg-danger'>
                <h1 className='modal-title text-white fs-5' id='exampleModalLabel'>
                  刪除{title}
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  aria-label='Close'
                  onClick={close}
                />
              </div>
              <div className='modal-body'>刪除 {text}</div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-outline-secondary fw-bold'
                onClick={close}>
                  取消
                </button>
                <button
                  type='button'
                  className='btn btn-danger fw-bold'
                  onClick={() => handleDelete(id)}
                >
                  確認刪除
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }


export default DeleteModal;

DeleteModal.propTypes = {
    close: propTypes.func.isRequired,
    id: propTypes.number,
    text: propTypes.string.isRequired,
    handleDelete: propTypes.func.isRequired,
    title: propTypes.string.isRequired
}