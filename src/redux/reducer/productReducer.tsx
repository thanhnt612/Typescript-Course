import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { http } from '../../utils/config';
import { DispatchType } from '../configStore';

//============================================================
export interface ProductModel {
    id: number;
    name: string;
    alias: string;
    price: number;
    description: string;
    size: string;
    shortDescription: string;
    quantity: number;
    deleted: boolean;
    categories: string;
    relatedProducts: string;
    feature: boolean;
    image: string;
}
export interface ProductDetail {
    id: number;
    name: string;
    alias: string;
    price: number;
    feature: boolean;
    description: string;
    size: string[];
    shortDescription: string;
    quantity: number;
    image: string;
    categories: Category[];
    relatedProducts: RelatedProduct[];
}

export interface Category {
    id: string;
    category: string;
}

export interface RelatedProduct {
    id: number;
    name: string;
    alias: string;
    feature: boolean;
    price: number;
    description: string;
    shortDescription: string;
    image: string;
}
//============================================================
interface ProductState {
    arrProduct: ProductModel[]
    productDetail: ProductDetail | null
}
const initialState: ProductState = {
    arrProduct: [],
    productDetail: null
}

const productReducer = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setArrAction: (state: ProductState, action: PayloadAction<ProductModel[]>) => {
            //B1: Lấy dữ liệu từ payload
            const arrProduct: ProductModel[] = action.payload;
            //B2: Cập nhật dữ liệu cho product state
            state.arrProduct = arrProduct;
        },
        setProductDetailAction: (state: ProductState, action: PayloadAction<ProductDetail>) => {
            state.productDetail = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductDetailApi.fulfilled,
            (state: ProductState, action: PayloadAction<ProductDetail>) => {
                state.productDetail = action.payload
            })
    }
});

export const { setArrAction, setProductDetailAction } = productReducer.actions

export default productReducer.reducer

//-----------------------action async---------------------------

export const getProductApi = () => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('api/product');
        let arrProduct: ProductModel[] = result.data.content;
        //Đưa lên action payload
        const action: PayloadAction<ProductModel[]> = setArrAction(arrProduct)
        dispatch(action)
    }
}

// export const getProductDetailApi = (id: string) => {
//     return async (dispatch: DispatchType) => {
//         const result: any = await http.get('api/product/getbyid?id=' + id);
//         let prodDetail: ProductDetail = result.data.content;
//         //Đưa lên action payload
//         const action: PayloadAction<ProductDetail> = setProductDetailAction(prodDetail)
//         dispatch(action)
//     }
// }
//----------------------Create Async Thunk----------------------
export const getProductDetailApi = createAsyncThunk(
    'product/getById',
    async (id: string) => {
        const result = await http.get('api/product/getbyid?id=' + id);
        return (result.data.content) as ProductDetail
    }
)