import propTypes from 'prop-types'

function Pagination({ pagination, changePage, categoryId }) {
    return(
        <nav aria-label='Page navigation'>
                <ul className='pagination'>
                    <li className={`page-item ${pagination?.currentPage === 1 ? 'disabled' : ''}`}>
                        <a className='page-link' href='/' aria-label='Previous'
                        onClick={(e) => {
                            e.preventDefault();
                            changePage(pagination?.currentPage - 1, categoryId);
                        }}
                        >
                            <span aria-hidden='true'>&laquo;</span>
                        </a>
                    </li>
                    {[...new Array(pagination?.totalPage)].map((_, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <li className='page-item' key={`${i}_page`}>
                            <a className={`page-link ${i + 1 === pagination?.currentPage && 'active'}`} href='/'
                            onClick={(e) => {
                                e.preventDefault();
                                changePage(i + 1, categoryId);                               
                            }}>
                                {i + 1}
                            </a>
                        </li>
                    ))}
                    <li className={`page-item ${pagination?.currentPage === pagination.totalPage ? 'disabled' : ''}`}>
                        <a className='page-link' href='/' aria-label='Next'
                        onClick={(e) => {
                            e.preventDefault();
                            changePage(pagination.currentPage + 1, categoryId);
                        }}
                        >
                            <span aria-hidden='true'>&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
    )

}

export default Pagination;

Pagination.propTypes = {
    pagination: propTypes.object.isRequired,
    changePage: propTypes.func.isRequired,
    categoryId: propTypes.number,
}