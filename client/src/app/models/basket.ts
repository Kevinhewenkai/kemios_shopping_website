export interface Basket {
    id: number
    buyerId: string
    items: BasketItem[]
    paymentIndentId?: string
    clientSecret?: string
}

export interface BasketItem {
    productId: number
    name: string
    price: number
    brand: string
    pictureUrl: string
    type: string
    quantity: number
}
  