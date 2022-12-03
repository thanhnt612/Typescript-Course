import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Productitem from '../../component/ProductItem'
import { DispatchType, RootState } from '../../redux/configStore'
import { getProductApi, ProductModel } from '../../redux/reducer/productReducer'
type Props = {}

export default function Home({ }: Props) {
    const { arrProduct } = useSelector((state: RootState) => state.productReducer)
    const dispatch: DispatchType = useDispatch()
    useEffect(() => {
        const actionAsync = getProductApi();
        dispatch(actionAsync)
    }, [])
    const renderProduct = (): JSX.Element[] => {
        return arrProduct.map((prod: ProductModel, index: number) => {
            return <div className='col-4' key={index}>
                <Productitem product={prod} />
            </div>
        })
    }
    return (
        <div className='container'>
            <h3>Product List</h3>
            <div className="row">
                {renderProduct()}
            </div>
        </div>
    )
}