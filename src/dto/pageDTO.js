export const pageDTO = (products) => {
    const pageDTO={
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage ? `https://ecomerce-villagra.onrender.com/products/?page=${products.prevPage}` : '',
        nextLink: products.hasNextPage ? `https://ecomerce-villagra.onrender.com/products/?page=${products.nextPage}` : ''
    };

    return pageDTO;
};


