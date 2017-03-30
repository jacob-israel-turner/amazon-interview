/*
q) You own a service that accepts orders for various products. How will you maintain an LRU cache of k products and its product information. 

    Each request has a {ProductId}
    You can use a getInfo() call to retrieve product information. 

    Example: Orders :- {A, B, A, A, C, D, E, A}
    k = 4
    
    [A, B, C, D, E]

    Your cache will have :
    {A -> ProductInfo(A)}
    {E -> ProductInfo(E)}
    {D -> ProductInfo(D)}
    {C -> ProductInfo(C)}

*/
    
    // First attempt (O(n) runtime)
    let orderCache = {}
    let orderRequestHistory = []
    const orderRequestHistoryLimit = 4
    
    function getOrderFromCache(productId) {
        let productInfo
        if (orderCache[productId]) productInfo = orderCache[productId]
        else {
            const productInfo = getInfo(productId)
            orderCache[productId] = productInfo
        }
        const index = orderRequestHistory.indexOf(productId)
        if (index !== -1) {
            orderRequestHistory.splice(index, 1)
        }
        orderRequestHistory.unshift(productId)
        if (orderRequestHistory.length > orderRequestHistoryLimit) {
            const idToRemove = orderRequestHistory.pop()
            delete orderCache[idToRemove]
        }
        return productInfo
    }

    
    // Second attempt (O(1) runtime)
    
    let orderCache = {}
    let firstItem = ''
    let lastItem = ''
    let numberOfItems = 0;
    const orderRequestLimit = 4
    
    function getOrderFromCache(productId) {
        let productInfo
        if (orderCache[productId]) productInfo = orderCache[productId].productInfo
        else {
            productInfo = getInfo(productId)
            orderCache[productId] = {productInfo: productInfo}
            if (firstItem) {
                orderCache[firstItem].parent = productId
            }
            else {
                lastItem = productId
            }
            orderCache[productId].child = firstItem
            firstItem = productId
            numberOfItems++
        }
        
        if (numberOfItems > orderRequestLimit) {
            let itemToRemove = lastItem;
            lastItem = orderCache[itemToRemove].parent
            delete orderCache[itemToRemove]
            numberOfItems--
        }
        
        return productInfo
    }

    /*
    
    orderCache = {
        a: {
            productInfo: ProductInfo(A),
            parent: B,
            child: C
        }
    }
    

    orderCache {productInfo(A)}
    orderRequestHistory [A]
    
    orderCache {A: productInfo(A), B: productInfo(B)}
    orderRequestHistory [B, A]
    
    orderCache {A: productInfo(A), B: productInfo(B)}
    orderRequestHistory [A, B]
    
    */
