import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useAllJobsContext } from '../../pages/AllJobs';

const PageBtnContainer = () => {
  const { isLightTheme } = useOutletContext() as { isLightTheme: boolean };
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
        className={` hover:text-white w-8 rounded-full aspect-square transition-colors duration-200
        ${
          isLightTheme
            ? 'hover:bg-neutral-950'
            : 'hover:bg-neutral-300 hover:text-black'
        }
        ${
          activeClass &&
          ` text-neutral-950  max-md:w-6
            ${isLightTheme ? 'bg-neutral-950 text-white' : 'bg-neutral-300 '}
          `
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
      pageButtons.push(
        <span key={'dots-prev'} className="max-md:hidden">
          ...
        </span>
      );
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
      pageButtons.push(
        <span key={'dots-next'} className="max-md:hidden">
          ...
        </span>
      );
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
    <div className="flex gap-5 max-md:gap-2 max-md:text-sm">
      <button
        className={` p-1 px-2 rounded-lg transition-colors duration-200
          ${isLightTheme ? 'hover:bg-neutral-300' : 'hover:bg-neutral-800'}
        `}
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
        className={` p-1 px-2 rounded-lg transition-colors duration-200
              ${isLightTheme ? 'hover:bg-neutral-300' : 'hover:bg-neutral-800'}
            `}
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
