import {customers,products,purchases} from '../data/sampleData'

export function getProductByCustomer(customerId,cardItems= []){
    const bought = purchases.filter((p) => p.customerId === customerId).map((p) =>  products.find((prod) => prod.productId === p.id))

    const cardProduct = cardItems.map((p) => {
        const base = products.find((prod) => prod.id === p.id)
        return base ? {...base} : null;
    }).filter(Boolean)

    return [...bought,...cardProduct]
}
export function getTopCategoryByCustomer(customerId,cardItems= []){
    const bought = getProductByCustomer(customerId,cardItems)
    const count = {}
    bought.forEach((p)=> {
        count[p.category]= (count[p.category] || 0) + 1
    })
    return Object.entries(count).sort((a,b) => b[1] - a[1])[0]?.[0] || null
}
export function recommendProducts(customerId,cardItems= []){
    const cat = getTopCategoryByCustomer(customerId,cardItems)
    if(!cat) return

    const similarCustomer= customers.map((c) => ({
        ...c,
        category : getTopCategoryByCustomer(c.id),
    })).filter((c) => c.category === cat && c.id !== customerId)

    const recommended = []
    similarCustomer.forEach((c) => {
        const theirProduct = getProductByCustomer(c.id)
        theirProduct.filter((p) => p.category === cat)
        .forEach((p) => {
            if(!recommended.find((r) => r.id === p.id)){
                recommended.push(p)
            }
        })
    })
    return recommended
}