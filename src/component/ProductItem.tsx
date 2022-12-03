import React from 'react'
import { NavLink } from 'react-router-dom'
import { ProductModel, RelatedProduct } from '../redux/reducer/productReducer'

type Props = {
    product: ProductModel | RelatedProduct
}

export default function ProductItem({ product }: Props) {
    return (
        <div className='card'>
            <img src={product.image} alt="..." />
            <div className="card-body">
                <h4>{product.name}</h4>
                <p>{product.price}</p>
                <NavLink to={`/detail/${product.id}`}
                    className="btn btn-dark">View detail</NavLink>
            </div>
        </div>
    )
}