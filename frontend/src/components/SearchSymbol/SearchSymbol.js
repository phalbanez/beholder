import React from 'react';

/**
 * props:
 * - placeholder
 * - onChange
 */
function SearchSymbol(props) {

    function getPlaceholder(){
        return props.placeholder ? props.placeholder : 'Search symbol';
    }

    return (
        <form className="navbar-search form-inline" id="navbar-search-main">
            <div className="input-group input-group-merge search-bar">
                <span className="input-group-text" id="topbar-addon">
                    <svg className="icon icon-xs" x-description="Heroicon name: solid/search"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd">
                        </path>
                    </svg>
                </span>
                <input type="text" className="form-control" id="search" placeholder={getPlaceholder()}
                    onChange={props.onChange} />
            </div>
        </form>
    )
}

export default SearchSymbol;
