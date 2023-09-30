import { useLocation, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../../pages/AllJobs';

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber: number) => {
    // To add extra query params to the URL, we need to use the URLSearchParams API
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', String(pageNumber));
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`${
          activeClass &&
          'bg-white text-neutral-950 w-7 rounded-full aspect-square max-md:w-6'
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // first page
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    if (currentPage > 3) {
      pageButtons.push(<span key={'dots-prev'}>...</span>);
    }

    // one page before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      );
    }
    //  Current page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }

    // one page after current page
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      );
    }

    if (currentPage < numOfPages - 2) {
      pageButtons.push(<span key={'dots-next'}>...</span>);
    }

    // last page
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );

    return pageButtons;
  };

  return (
    <div className="flex gap-5 max-md:text-sm">
      <button
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = 1;
          handlePageChange(prevPage);
        }}
      >
        &larr; prev
      </button>
      {renderPageButtons()}
      <button
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next &rarr;
      </button>
    </div>
  );
};
export default PageBtnContainer;
