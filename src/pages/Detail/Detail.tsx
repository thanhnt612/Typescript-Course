import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductItem from '../../component/ProductItem'
import { DispatchType, RootState } from '../../redux/configStore'
import { getProductDetailApi, RelatedProduct } from '../../redux/reducer/productReducer'

type Props = {}

export default function Detail({ }: Props) {
    const { productDetail } = useSelector((state: RootState) => state.productReducer)
    const dispatch: DispatchType = useDispatch()
    //Lấy param id từ url
    const params: any = useParams()
    useEffect(() => {
        const action = getProductDetailApi(params.id);
        dispatch(action)
    }, [params.id])
    return (
        <div className='container'>
            <h3>Product Detail</h3>
            <div className="row">
                <div className="col-4">
                    <img src={productDetail?.image} alt="..." />
                </div>
                <div className="col-8">
                    <h3>{productDetail?.name}</h3>
                    <p>{productDetail?.description}</p>
                    <button className='btn btn-dark'>Add to cart<i className='fa fa-cart-plus'></i>
                    </button>
                </div>
            </div>
            <div className="mt-2">
                <h3>Related Product</h3>
                <div className="row">
                    {productDetail?.relatedProducts?.map((item: RelatedProduct, index) => {
                        return <div className='col-4' key={index}>
                            <ProductItem product={item} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}