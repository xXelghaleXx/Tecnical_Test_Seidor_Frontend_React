import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import './Pagination.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    loading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    loading = false
}) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Show pages around current
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    const handlePageClick = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= totalPages && !loading) {
            onPageChange(page);
        }
    };

    return (
        <div className="pagination-container">
            <div className="pagination-info">
                Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
            </div>

            <div className="pagination-controls">
                {/* First Page */}
                <button
                    className="pagination-btn pagination-btn-nav"
                    onClick={() => handlePageClick(1)}
                    disabled={currentPage === 1 || loading}
                    title="Primera página"
                >
                    <ChevronsLeft size={18} />
                </button>

                {/* Previous Page */}
                <button
                    className="pagination-btn pagination-btn-nav"
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                    title="Página anterior"
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Page Numbers */}
                <div className="pagination-numbers">
                    {getPageNumbers().map((page, index) => (
                        typeof page === 'number' ? (
                            <button
                                key={index}
                                className={`pagination-btn pagination-btn-page ${page === currentPage ? 'active' : ''
                                    }`}
                                onClick={() => handlePageClick(page)}
                                disabled={loading}
                            >
                                {page}
                            </button>
                        ) : (
                            <span key={index} className="pagination-ellipsis">
                                {page}
                            </span>
                        )
                    ))}
                </div>

                {/* Next Page */}
                <button
                    className="pagination-btn pagination-btn-nav"
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === totalPages || loading}
                    title="Página siguiente"
                >
                    <ChevronRight size={18} />
                </button>

                {/* Last Page */}
                <button
                    className="pagination-btn pagination-btn-nav"
                    onClick={() => handlePageClick(totalPages)}
                    disabled={currentPage === totalPages || loading}
                    title="Última página"
                >
                    <ChevronsRight size={18} />
                </button>
            </div>
        </div>
    );
};
