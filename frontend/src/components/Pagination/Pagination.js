import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const PAGE_SIZE = 10;

/**
 * props:
 * - count
 */
function Pagination(props) {

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();

    function getPageClass(page) {
        const queryPage = query.get('page');
        // eslint-disable-next-line
        const isActive = queryPage == page || (!queryPage && page === 1);
        return isActive ? "page-item active" : "page-item";
    }

    function getPageLink(page) {
        return `${window.location.pathname}?page=${page}`;
    }

    let pagesQty = Math.ceil(props.count / PAGE_SIZE);
    pagesQty = pagesQty > 10 ? 10 : pagesQty;
    const pages = [];
    for (let i = 1; i <= pagesQty; i++)
        pages.push(i);

    function getBottom() {
        if (props.count > 100)
            return (<div className="fw-normal small mt-4 mt-lg-0"><b>{props.count}</b> results. First <b>10</b> pages.</div>);
        else if (props.count > 0)
            return (<div className="fw-normal small mt-4 mt-lg-0"><b>{props.count}</b> results.</div>);
        else
            return (<div className="fw-normal small mt-4 mt-lg-0"><b>No results found.</b> Create one first.</div>);
    }

    return (
        <div className="card-footer px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
            <nav aria-label="Page navigation">
                <ul className="pagination mb-0">
                    {
                        pages.map(p => (
                            <li key={p} className={getPageClass(p)}>
                                <Link className="page-link" to={getPageLink(p)}>{p}</Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            {getBottom()}
        </div>
    )
}

export default Pagination;