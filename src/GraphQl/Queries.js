//All grapql queries types for request to server

export const CATEGORY_AND_PRICE_NAMES = `
    query{
        categories{
            name
        }
        currencies{
            label
            symbol
        }
    }
`;

 

export const ALL_PRODUCTS_DATA_QUERY = `
    query{
        categories{
            name
            products{
                id   
                name
                brand
                category
                brand
                inStock
                gallery
                description
                prices{
                    amount
                    currency{
                        symbol
                        label
                }
                }
                attributes{          
                    id
                    name
                    type
                    items{
                        displayValue
                        value
                        id
                    }
                }
            }
        }
    }`;

export const PRODUCT_DETAILS_QUERY = `
    query{
        category{
            name
            products{
                id   
                name
                brand
                category
                brand
                inStock
                gallery
                description
                prices{
                    amount
                    currency{
                        symbol
                        label
                    }
                }
                attributes{          
                    id
                    name
                    type
                    items{
                        displayValue
                        value
                        id
                    }
                }
            }
        }
        
    }`;